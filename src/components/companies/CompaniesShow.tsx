import {
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin';
import VehiclesList from './VehiclesList'; // Importa el componente VehiclesList
import DriversList from './DriversList'; // Importa el componente DriversList

export const CompaniesShow = () => (
  <Show>
    <SimpleShowLayout>
      {/* Información de la compañía */}
      <TextField source="id" label="ID" />
      <TextField source="name" label="Nombre" />
      <TextField source="email" label="Correo Electrónico" />
      <TextField source="address" label="Dirección" />

      {/* Lista de conductores */}
      <h3>Conductores</h3>
      <DriversList />

      {/* Lista de vehículos */}
      <h3>Vehículos</h3>
      <VehiclesList /> {/* Usa el componente VehiclesList */}
            
    </SimpleShowLayout>
  </Show>
);