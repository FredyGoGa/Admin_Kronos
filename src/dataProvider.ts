import jsonServerProvider from "ra-data-json-server";
//import { fetchUtils } from 'react-admin';
import { faker } from '@faker-js/faker';


export const dataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL,
);

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

// Exportar como array
export const users = generateUsers();