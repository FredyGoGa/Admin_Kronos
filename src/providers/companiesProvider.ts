import httpClient from '../utils/httpClient';

const apiUrl = import.meta.env.VITE_API_URL || 'https://dev-api.enrut.info';

export const companiesProvider = {
  getList: async (params: any) => {
    const url = `${apiUrl}/companies`;
    const { json } = await httpClient(url);
    return {
      data: json,
      total: json.length,
    };
  },
  getOne: async (id: string) => {
    const url = `${apiUrl}/companies/${id}`;
    const { json } = await httpClient(url);
    return { data: json };
  },
  create: async (data: any) => {
    const url = `${apiUrl}/companies`;
    const { json } = await httpClient(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return { data: { ...data, id: json.id } };
  },
  update: async (id: string, data: any) => {
    const url = `${apiUrl}/companies/${id}`;
    const { json } = await httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return { data: json };
  },
  getMany: async (resource: string, params: any) => {
    // Implementation for getMany
    return { data: [] };
  },
  getManyReference: async (resource: string, params: any) => {
    // Implementation for getManyReference
    return { data: [], total: 0 };
  },
  updateMany: async (resource: string, params: any) => {
    // Implementation for updateMany
    return { data: [] };
  },
  delete: async (resource: string, params: any) => {
    // Implementation for delete
    return { data: {} };
  },
  deleteMany: async (resource: string, params: any) => {
    // Implementation for deleteMany
    return { data: [] };
  },
};