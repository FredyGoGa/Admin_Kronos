import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { log } from 'console';

const apiUrl = import.meta.env.VITE_API_URL || 'https://dev-api.enrut.info'; // URL base de la API
const httpClient = fetchUtils.fetchJson;

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
    if (resource === 'companies') {
      const url = `${apiUrl}/companies/${params.id}`;
      const { json } = await httpClient(url, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      });
      return { data: json };
    }
    return dataProvider.update(resource, params);
  },
  delete: async (resource: string, params: any) => {
    if (resource === 'companies') {
      const url = `${apiUrl}/companies/${params.id}`;
      const { json } = await httpClient(url, {
        method: 'DELETE',
      });
      return { data: json };
    }
    return dataProvider.delete(resource, params);
  },
};

export { customDataProvider as dataProvider };