import httpClient from '../utils/httpClient';

const apiUrl = import.meta.env.VITE_API_URL || 'https://dev-api.enrut.info';

export const routesProvider = {
  getList: async (params: any) => {
    const url = `${apiUrl}/routes`;
    const { json } = await httpClient(url);
    return {
      data: json,
      total: json.length,
    };
  },
  getOne: async (id: string) => {
    const url = `${apiUrl}/routes/${id}`;
    const { json } = await httpClient(url);
    return { data: json };
  },
  create: async (data: any) => {
    const url = `${apiUrl}/routes`;
    const { json } = await httpClient(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return { data: { ...data, id: json.id } };
  },
  update: async (id: string, data: any) => {
    const url = `${apiUrl}/routes/${id}`;
    const { json } = await httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return { data: json };
  },
};