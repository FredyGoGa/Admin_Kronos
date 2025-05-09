import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { log } from 'console';

const apiUrl = import.meta.env.VITE_API_URL || 'https://dev-api.enrut.info'; // URL base de la API
// const httpClient = fetchUtils.fetchJson;
const httpClient = (url: string, options: any = {}) => {
  const idToken = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  if (idToken) {
    options.headers.set('Authorization', `Bearer ${idToken}`); // Agrega el token al encabezado
  }
   console.log('Encabezados enviados:', options.headers);
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider(apiUrl, httpClient);

const customDataProvider = {
  ...dataProvider,
  getList: async (resource: string, params: any) => {
    if (resource === 'companies') {
      const url = `${apiUrl}/companies`;
      const { json } = await httpClient(url);
      return {
        data: json,// Ajusta según la estructura de tu API
        total: json.length,
      };
    }
    if (resource === 'routes') {
 
      const url = `${apiUrl}/routes`;
      const { json } = await httpClient(url);

      return {
        data: json,
        total: json.length,
      };
    }
    if (resource === 'drivers') {
      const url = `${apiUrl}/companies/{companyId}/drivers`;
      const { json } = await httpClient(url);
      return {
        data: json,
        total: json.length,
      };
    }
    return dataProvider.getList(resource, params);
  },
  getOne: async (resource: string, params: any) => {
    if (resource === 'companies') {
      const url = `${apiUrl}/companies/${params.id}`;
      const { json } = await httpClient(url);
      return { data: json };
    }
    return dataProvider.getOne(resource, params);
  },
  create: async (resource: string, params: any) => {
    if (resource === 'companies') {
      const url = `${apiUrl}/companies`;
      const { json } = await httpClient(url, {
        method: 'POST',
        body: JSON.stringify(params.data),
      });
      return { data: { ...params.data, id: json.id } };
    }
    return dataProvider.create(resource, params);
  },
  update: async (resource: string, params: any) => {
    if (resource === 'routes') {
      const url = `${apiUrl}/routes/${params.id}`;
      const { json } = await httpClient(url, {
        method: 'PUT', // Cambia a PATCH si tu API lo requiere
        body: JSON.stringify(params.data),
      });
      return { data: json };
    }
    return dataProvider.update(resource, params);
  },  
};
export { customDataProvider as dataProvider };