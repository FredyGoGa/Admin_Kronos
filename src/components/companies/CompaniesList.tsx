// The import of React is unnecessary in modern React versions (17+), as JSX transformations no longer require it.
// You can safely remove the import statement.
import { List, Datagrid, TextField } from 'react-admin';

export const CompaniesList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
    </Datagrid>
  </List>
);