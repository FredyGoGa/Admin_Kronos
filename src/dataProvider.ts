import jsonServerProvider from "ra-data-json-server";
import { fetchUtils } from 'react-admin';
import { faker } from '@faker-js/faker';

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL;
const jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com';

const httpClient = fetchUtils.fetchJson;

const dataProvider = jsonServerProvider(apiUrl, httpClient);

const generateUsers = (count = 10) => {
  return Array.from({ length: count }, (_, id) => ({
    id: id + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    createdAt: faker.date.past().toISOString(),
  }));
};
const users = generateUsers(50); 

const customDataProvider = {
  ...dataProvider,
  getList: async (resource: string, params: any) => {
    if (resource === 'compañias') {
      return httpClient(`${jsonPlaceholderUrl}/users`).then(({ json }) => ({
        data: json,
        total: json.length,
      }));
    }
    if (resource === 'users') {
      return Promise.resolve({
        data: users,
        total: users.length,
      });
    }
    return dataProvider.getList(resource, params);
  },
  getOne: (resource: string, params: any) => {
    if (resource === 'compañias') {
      return httpClient(`${jsonPlaceholderUrl}/users/${params.id}`).then(({ json }) => ({
        data: json,
      }));
    }
    if (resource === 'users') {
      const user = users.find(user => user.id === params.id);
      if (user) {
        return Promise.resolve({
          data: user,
        });
      }
      return Promise.reject('Usuario no encontrado');
    }
    return dataProvider.getOne(resource, params);
  },
  // Implementar otros métodos si es necesario
};

export { customDataProvider as dataProvider };



// Exportar como array
//export const users = generateUsers();