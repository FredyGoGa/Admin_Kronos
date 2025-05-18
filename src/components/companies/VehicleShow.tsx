import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
} from 'react-admin';

const VehicleShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" label="Placa" />
      <TextField source="number" label="Número" />
      <TextField source="status" label="Estado" />
      <TextField source="routeId" label="Ruta" />
      <NumberField source="tripProgress" label="Progreso" />
      <TextField source="lastPosition.latitude" label="Latitud" />
      <TextField source="lastPosition.longitude" label="Longitud" />
      <NumberField source="lastPosition.speed" label="Velocidad" />
      <NumberField source="lastPosition.altitude" label="Altitud" />
      <NumberField source="lastPosition.accuracy" label="Precisión" />
      <DateField source="lastPosition.timestamp" label="Última Actualización" />
      <DateField source="created" label="Creado" />
      <DateField source="updated" label="Actualizado" />
    </SimpleShowLayout>
  </Show>
);

export default VehicleShow;