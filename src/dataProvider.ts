import { fetchUtils } from 'react-admin';
import { companiesProvider } from './providers/companiesProvider';
import { routesProvider } from './providers/routesProvider';
import { vehiclesProvider } from './providers/vehiclesProvider';

const apiUrl = 'https://dev-api.enrut.info';

const httpClient = (url: string, options: RequestInit = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('authToken');
  if (token) {
    (options.headers as Headers).set('Authorization', `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
};

interface GetListParams {
  pagination?: { page: number; perPage: number };
  sort?: { field: string; order: string };
  filter?: Record<string, any>;
}

const customDataProvider = {
  getList: async (resource: string, params: GetListParams) => {
    if (resource === 'companies') return companiesProvider.getList(params);
    if (resource === 'vehicles') {
      const { companyId } = params.filter || {};
      let url;
      if (companyId) {
        url = `${apiUrl}/companies/${companyId}/vehicles`;
      } else {
        url = `${apiUrl}/vehicles`; // endpoint general
      }
      const { json } = await httpClient(url);

      // Asegura que siempre sea un array
      let data: any[] = [];
      if (Array.isArray(json)) {
        data = json;
      } else if (json && typeof json === 'object') {
        // Si el backend devuelve un objeto único, lo convertimos en array
        data = [json];
      }

      return {
        data,
        total: data.length,
      };
    }
    if (resource === 'routes') {
      return routesProvider.getList(params);
    }
    throw new Error(`No provider found for resource: ${resource}`);
  },
  getOne: async (resource: string, params: { id: string }) => {
    if (resource === 'vehicles') {
      // Busca el vehículo por ID en el endpoint general
      const companyId = ""
      const vehicleId = ""
      const url = `${apiUrl}/companies/${companyId}/vehicles/${vehicleId}`;
      const { json } = await httpClient(url);
      return { data: json };
    }
    if (resource === 'companies') {
      const url = `${apiUrl}/companies/${params.id}`;
      const { json } = await httpClient(url);
      return { data: json };
    }
    if (resource === 'routes') {
      const url = `${apiUrl}/routes/${params.id}`;
      const { json } = await httpClient(url);
      return { data: json };
    }
    return Promise.reject("Not implemented");
  },
getManyReference: async (
  resource: string,
  params: { target: string; id: string; [key: string]: any }
) => {
  if (resource === 'vehicles') {
    // params.target será "companyId", params.id será el id de la compañía
    const url = `${apiUrl}/companies/${params.id}/vehicles`;
    const { json } = await httpClient(url);

    let data: any[] = [];
    if (Array.isArray(json)) {
      data = json;
    } else if (json && typeof json === 'object') {
      data = [json];
    }

    return {
      data,
      total: data.length,
    };
  }
  return Promise.reject("Not implemented");
},
  getMany: (resource: string, params: any) => Promise.reject("Not implemented"),
  update: (resource: string, params: any) => Promise.reject("Not implemented"),
  updateMany: (resource: string, params: any) => Promise.reject("Not implemented"),
  create: (resource: string, params: any) => Promise.reject("Not implemented"),
  delete: (resource: string, params: any) => Promise.reject("Not implemented"),
  deleteMany: (resource: string, params: any) => Promise.reject("Not implemented"),
};

export { customDataProvider as dataProvider };