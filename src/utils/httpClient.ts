import { fetchUtils } from 'react-admin';

const httpClient = (url: string, options: any = {}) => {
  const idToken = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  if (idToken) {
    options.headers.set('Authorization', `Bearer ${idToken}`); // Agrega el token al encabezado
  }
  return fetchUtils.fetchJson(url, options);
};

export default httpClient;