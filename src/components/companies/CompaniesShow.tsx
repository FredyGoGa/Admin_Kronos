import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceManyField,
  Datagrid,
  NumberField,
  DateField,
  useRecordContext,
  Button,
} from 'react-admin';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

const VehicleInfoButton = () => {
  const record = useRecordContext();
  const [open, setOpen] = useState(false);
  if (!record) return null;
  return (
    <>
      <Button label="Ver Detalle" onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Detalle del Vehículo {record.id}</DialogTitle>
        <DialogContent>
          <div><b>Placa:</b> {record.id}</div>
          <div><b>Número:</b> {record.number}</div>
          <div><b>Estado:</b> {record.status}</div>
          <div><b>Ruta:</b> {record.routeId}</div>
          <div><b>Progreso:</b> {record.tripProgress}</div>
          <div><b>Latitud:</b> {record.lastPosition?.latitude}</div>
          <div><b>Longitud:</b> {record.lastPosition?.longitude}</div>
          <div><b>Velocidad:</b> {record.lastPosition?.speed}</div>
          <div><b>Altitud:</b> {record.lastPosition?.altitude}</div>
          <div><b>Precisión:</b> {record.lastPosition?.accuracy}</div>
          <div><b>Última Actualización:</b> {record.lastPosition?.timestamp}</div>
          <div><b>Creado:</b> {record.created}</div>
          <div><b>Actualizado:</b> {record.updated}</div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const CompaniesShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Nombre" />
      <TextField source="email" label="Correo" />
      <TextField source="address" label="Dirección" />
      <TextField source="city" label="Ciudad" />
      <TextField source="phone" label="Teléfono" />
      <DateField source="created" label="Creado" />
      <DateField source="updated" label="Actualizado" />
      <ReferenceManyField
        label="Vehículos"
        reference="vehicles"
        target="companyId"
      >
        <Datagrid>
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
          <VehicleInfoButton />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);