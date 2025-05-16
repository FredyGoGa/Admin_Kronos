import { useEffect, useState } from 'react';
import { useRecordContext } from 'react-admin';

const VehiclesList = () => {
  const record = useRecordContext(); // Obtén el registro actual (compañía seleccionada)
  interface Vehicle {
    id: string;
    number: string;
    status: string;
    routeId: string;
    tripProgress: number;
    lastPosition: {
      latitude: number;
      longitude: number;
      speed: number;
      altitude: number;
      accuracy: number;
      timestamp: string;
    };
    created: string;
    updated: string;
  }
  
  const [vehicles, setVehicles] = useState<Vehicle[]>([]); // Estado para almacenar los vehículos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [selected, setSelected] = useState<Vehicle | null>(null);
  useEffect(() => {
    if (!record) return;

    const fetchVehicles = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('authToken'); // Cambia 'authToken' por el nombre real de tu token si es diferente
      if (!token) {
        throw new Error('No se encontró un token de autenticación.');
      }
        const response = await fetch(
          `https://dev-api.enrut.info/companies/${record.id}/vehicles`,

          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Agrega el token de autenticación aquí
            },
          }

        );

        if (!response.ok) {
          throw new Error(`Error al obtener los vehículos: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos obtenidos del backend:', data); // Depuración
        setVehicles(data);
      } catch (err) {
        console.error('Error al obtener los vehículos:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [record]);

  if (!record) {
    return <p>No se ha seleccionado ninguna compañía.</p>;
  }

  if (loading) {
    return <p>Cargando vehículos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (vehicles.length === 0) {
    return <p>No hay vehículos disponibles para esta compañía.</p>;
  }

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc' }}>Placa</th>
            <th style={{ border: '1px solid #ccc' }}>Número</th>
            <th style={{ border: '1px solid #ccc' }}>Estado</th>
            <th style={{ border: '1px solid #ccc' }}>Ruta</th>
            <th style={{ border: '1px solid #ccc' }}>Progreso</th>
            <th style={{ border: '1px solid #ccc' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td style={{ border: '1px solid #ccc' }}>{vehicle.id}</td>
              <td style={{ border: '1px solid #ccc' }}>{vehicle.number}</td>
              <td style={{ border: '1px solid #ccc' }}>{vehicle.status}</td>
              <td style={{ border: '1px solid #ccc' }}>{vehicle.routeId}</td>
              <td style={{ border: '1px solid #ccc' }}>{vehicle.tripProgress}%</td>
              <td style={{ border: '1px solid #ccc' }}>
                <button onClick={() => setSelected(vehicle)}>Ver detalles</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div style={{ marginTop: 24, padding: 16, border: '1px solid #1976d2', borderRadius: 8, background: '#f5faff' }}>
          <h3>Detalles del vehículo: {selected.id}</h3>
          <p><strong>Número:</strong> {selected.number}</p>
          <p><strong>Estado:</strong> {selected.status}</p>
          <p><strong>Ruta:</strong> {selected.routeId}</p>
          <p><strong>Progreso:</strong> {selected.tripProgress}%</p>
          <p><strong>Latitud:</strong> {selected.lastPosition.latitude}</p>
          <p><strong>Longitud:</strong> {selected.lastPosition.longitude}</p>
          <p><strong>Velocidad:</strong> {selected.lastPosition.speed} km/h</p>
          <p><strong>Altitud:</strong> {selected.lastPosition.altitude} m</p>
          <p><strong>Precisión:</strong> {selected.lastPosition.accuracy} m</p>
          <p><strong>Última Actualización:</strong> {selected.lastPosition.timestamp}</p>
          <p><strong>Creado:</strong> {selected.created}</p>
          <p><strong>Actualizado:</strong> {selected.updated}</p>
          <button onClick={() => setSelected(null)} style={{ marginTop: 8 }}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default VehiclesList;