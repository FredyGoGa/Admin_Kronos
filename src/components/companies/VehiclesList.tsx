import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ShowButton,
  useRecordContext,
  Filter,
  TextInput,
} from 'react-admin';

const VehicleFilter = [
  <TextInput key="id" label="Buscar por placa" source="id" alwaysOn />,
  <TextInput key="number" label="Número" source="number" />,
];

const VehiclesList = () => {
  const record = useRecordContext();
  const filter = record ? { companyId: record.id } : {};

  return (
    <List
      resource="vehicles"
      filter={filter}  
      title="Vehículos"
      actions={false}
      pagination={false}
    >
      <Datagrid rowClick="show">
        <TextField source="id" label="Placa" />
        <TextField source="number" label="Número" />
        <TextField source="status" label="Estado" />
        <TextField source="routeId" label="Ruta" />
        <NumberField source="tripProgress" label="Progreso" />
        <ShowButton />
      </Datagrid>
    </List>
  );
};

export default VehiclesList;