import  {companiesProvider} from './providers/companiesProvider';
import  {routesProvider} from './providers/routesProvider';

const customDataProvider = {
  getList: async (resource: string, params: any) => {
    if (resource === 'companies') return companiesProvider.getList(params);
    if (resource === 'routes') return routesProvider.getList(params);
    throw new Error(`No provider found for resource: ${resource}`);
  },
  getOne: async (resource: string, params: any) => {
    if (resource === 'companies') return companiesProvider.getOne(params.id);
    if (resource === 'routes') return routesProvider.getOne(params.id);
    
    throw new Error(`No provider found for resource: ${resource}`);
  },
  create: async (resource: string, params: any) => {
    if (resource === 'companies') return companiesProvider.create(params.data);
    if (resource === 'routes') return routesProvider.create(params.data);
    
    throw new Error(`No provider found for resource: ${resource}`);
  },
  update: async (resource: string, params: any) => {
    if (resource === 'companies') return companiesProvider.update(params.id, params.data);
    if (resource === 'routes') return routesProvider.update(params.id, params.data);
    
    throw new Error(`No provider found for resource: ${resource}`);
  },
  getMany: async (resource: string, params: any) => {
    // Implementation for getMany
        if (resource === 'companies') return companiesProvider.update(params.id, params.data);
    if (resource === 'routes') return routesProvider.update(params.id, params.data);
    return { data: [] };
  },
  getManyReference: async (resource: string, params: any) => {
    // Implementation for getManyReference
        if (resource === 'companies') return companiesProvider.update(params.id, params.data);
    if (resource === 'routes') return routesProvider.update(params.id, params.data);
    return { data: [], total: 0 };
  },
  updateMany: async (resource: string, params: any) => {
    // Implementation for updateMany
        if (resource === 'companies') return companiesProvider.update(params.id, params.data);
    if (resource === 'routes') return routesProvider.update(params.id, params.data);
    return { data: [] };
  },
  delete: async (resource: string, params: any) => {
    // Implementation for delete
        if (resource === 'companies') return companiesProvider.update(params.id, params.data);
    if (resource === 'routes') return routesProvider.update(params.id, params.data);
    return { data: {} };
  },
  deleteMany: async (resource: string, params: any) => {
    // Implementation for deleteMany
        if (resource === 'companies') return companiesProvider.update(params.id, params.data);
    if (resource === 'routes') return routesProvider.update(params.id, params.data);
    return { data: [] };
  },
};

export { customDataProvider as dataProvider };