import jsonServerProvider from "ra-data-json-server";
import { fetchUtils } from 'react-admin';

// const apiUrl = import.meta.env.VITE_JSON_SERVER_URL;

// const httpClient = (url: string, options: any = {}) => {
//   if (!options.headers) {
//       options.headers = new Headers({ Accept: 'application/json' });
//   }
//   // Add custom headers or other logic here if needed
//   return fetchUtils.fetchJson(url, options);
// };


// const dataProvider = jsonServerProvider(apiUrl, httpClient);

// export default {
//     ...dataProvider,
//     getList: (resource: string, params: any) => {
//         if (resource === 'users') {
//             // Custom logic for users if needed
//         }
//         return dataProvider.getList(resource, params);
//     },
//     getCompanies: (params: any) => {
//         return httpClient(`${apiUrl}/companies`, {
//             method: 'GET',
//             ...params
//         }).then(({ json }) => ({ data: json, total: json.length }));
//     },
//     // Add other custom methods if needed
// };


export const dataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL,
);
