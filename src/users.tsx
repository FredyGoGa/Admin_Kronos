import { Datagrid, EmailField, List, TextField } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid>
            <TextField source="ID" />
            <TextField source="ID COMPAÑIA" />
            <TextField source="NOMBRE" />
            <TextField source="TELEFONO" />            
            <EmailField source="CORREO" />
            <TextField source="ID VEHICULO" />            
            <TextField source="GS1PK" />
            <TextField source="GS1SK" />
        </Datagrid>
    </List>
);