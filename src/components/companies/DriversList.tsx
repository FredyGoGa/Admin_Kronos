import React from 'react';
import {
  useRecordContext,
  ReferenceManyField,
  Datagrid,
  TextField as RAField,
} from 'react-admin';

const DriversList = () => {
  const record = useRecordContext(); // Obtén el registro actual (compañía seleccionada)
  if (!record) return null;

  return (
    <ReferenceManyField
      label="Conductores"
      reference="drivers" // Nombre del recurso relacionado
      target="companyId" // Campo que relaciona conductores con la compañía
      filter={{ companyId: record.id }} // Filtra los conductores por la compañía seleccionada
    >
      <Datagrid>
        <RAField source="id" label="ID" />
        <RAField source="name" label="Nombre" />
        <RAField source="email" label="Correo Electrónico" />
        <RAField source="phone" label="Teléfono" />
      </Datagrid>
    </ReferenceManyField>
  );
};

export default DriversList;