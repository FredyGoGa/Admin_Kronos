// declare const fakeDataProvider: {
//     getList: (resource: string, params: any) => Promise<{ data: any[]; total: number }>;
//     // Agrega otros métodos si es necesario
//   };
  
//   export default fakeDataProvider;
import { faker } from '@faker-js/faker';
const generateUsers = (numUsers: number) => {
    const users = [];
    for (let i = 0; i < numUsers; i++) {
      users.push({
        id: i + 1,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.address.streetAddress(),
      });
    }
    return users;
};

const users = generateUsers(50);

const fakeDataProvider = {
    getList: (resource: string, params: any) => {
      if (resource === 'users') {
        return Promise.resolve({
          data: users,
          total: users.length,
        });
      }
      return Promise.reject('Recurso no encontrado');
    },
    getOne: (resource, params) => {
      if (resource === 'users') {
        const user = users.find(user => user.id === params.id);
        if (user) {
          return Promise.resolve({
            data: user,
          });
        }
        return Promise.reject('Usuario no encontrado');
      }
      return Promise.reject('Recurso no encontrado');
    },
    getMany: (resource: string, params: any) => {
      if (resource === 'users') {
        const selectedUsers = users.filter(user => params.ids.includes(user.id));
        return Promise.resolve({
          data: selectedUsers,
        });
      }
      return Promise.reject('Recurso no encontrado');
    },
    getManyReference: (resource: string, params: any) => {
      // Implementar lógica si es necesario
      return Promise.reject('Recurso no encontrado');
    },
    update: (resource: string, params: any) => {
      if (resource === 'users') {
        const index = users.findIndex(user => user.id === params.id);
        if (index !== -1) {
          users[index] = { ...users[index], ...params.data };
          return Promise.resolve({
            data: users[index],
          });
        }
      }
      return Promise.reject('Recurso no encontrado');
    },
    updateMany: (resource: string, params: any) => {
      // Implementar lógica si es necesario
      return Promise.reject('Recurso no encontrado');
    },
    create: (resource: string, params: any) => {
      if (resource === 'users') {
        const newUser = { id: users.length + 1, ...params.data };
        users.push(newUser);
        return Promise.resolve({
          data: newUser,
        });
      }
      return Promise.reject('Recurso no encontrado');
    },
    delete: (resource: string, params: any) => {
      if (resource === 'users') {
        const index = users.findIndex(user => user.id === params.id);
        if (index !== -1) {
          const deletedUser = users.splice(index, 1);
          return Promise.resolve({
            data: deletedUser[0],
          });
        }
      }
      return Promise.reject('Recurso no encontrado');
    },
    deleteMany: (resource: string, params: any) => {
      // Implementar lógica si es necesario
      return Promise.reject('Recurso no encontrado');
    },

   
  };
  
  
  export default fakeDataProvider;