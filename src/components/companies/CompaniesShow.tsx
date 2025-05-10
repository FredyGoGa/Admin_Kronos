import {
  Show,
  SimpleShowLayout,
  TextField,
  useRecordContext,
  Datagrid,
  ReferenceManyField,
  TextField as RAField,
  DateField,
  NumberField,
} from 'react-admin';

const VehiclesList = () => {
  const record = useRecordContext(); // Obtén el registro actual (compañía seleccionada)
  if (!record) return null;

  return (
    <ReferenceManyField
      label="Vehículos"
      reference="vehicles" // Nombre del recurso relacionado
      target="companyId" // Campo que relaciona vehículos con la compañía
      resource={`/companies/${record.id}/vehicles`} // Endpoint específico para vehículos
    >
      <Datagrid>
        <RAField source="id" label="Placa" />
        <RAField source="number" label="Número" />
        <RAField source="status" label="Estado" />
        <RAField source="driverId" label="ID del Conductor" />
        <RAField source="routeId" label="ID de la Ruta" />
        <NumberField source="tripProgress" label="Progreso del Viaje (%)" />
        <RAField source="tripId" label="ID del Viaje" />
        <RAField source="lastPosition.latitude" label="Latitud" />
        <RAField source="lastPosition.longitude" label="Longitud" />
        <NumberField source="lastPosition.speed" label="Velocidad (km/h)" />
        <DateField source="lastPosition.timestamp" label="Última Actualización" />
        <DateField source="created" label="Creado" />
        <DateField source="updated" label="Actualizado" />
      </Datagrid>
    </ReferenceManyField>
  );
};

export const CompaniesShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Nombre" />
      <TextField source="email" label="Correo Electrónico" />
      <TextField source="address" label="Dirección" />
      <VehiclesList /> {/* Muestra la lista de vehículos */}
    </SimpleShowLayout>
  </Show>
);