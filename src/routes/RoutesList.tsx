import { List, Datagrid, TextField, NumberField } from 'react-admin';

export const RoutesList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Nombre de la Ruta" />
      <TextField source="destination" label="Descripción" />
      <NumberField source="routeFile" label="Distancia (km)" />
      <NumberField source="coordinates" label="Descripción" />
      <NumberField source="created" label="Distancia (km)" />
      <NumberField source="updated" label="Distancia (km)" />
    
    
    
    
    </Datagrid>
  </List>
);