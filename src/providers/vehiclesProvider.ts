import customHttpClient from '../utils/httpClient';

const apiUrl = 'https://dev-api.enrut.info'; // URL base de tu API
const httpClient = customHttpClient;

export const vehiclesProvider = {
  getList: async (params: any) => {
    const { companyId } = params.filter; 
    console.log('Filtro companyId:', companyId); // Depuración// Obtén el ID de la compañía del filtro
    const url = `${apiUrl}/companies/${companyId}/vehicles`;
    const { json } = await httpClient(url);
     console.log('Respuesta del servidor:', json); // Depuración
    return {
      data: json,
      total: json.length,
    };
  },
  getOne: async (id: string) => {
    const url = `${apiUrl}/vehicles/${id}`;
    const { json } = await httpClient(url);
    return { data: json };
  },
  create: async (data: any) => {
    const url = `${apiUrl}/vehicles`;
    const { json } = await httpClient(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return { data: { ...data, id: json.id } };
  },
  update: async (id: string, data: any) => {
    const url = `${apiUrl}/vehicles/${id}`;
    const { json } = await httpClient(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return { data: json };
  },
  delete: async (id: string) => {
    const url = `${apiUrl}/vehicles/${id}`;
    const { json } = await httpClient(url, {
      method: 'DELETE',
    });
    return { data: json };
  },
};