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
    <ul>
      {vehicles.map((vehicle) => (
        <li key={vehicle.id}>
          <strong>Placa:</strong> {vehicle.id} | <strong>Número:</strong> {vehicle.number} |{' '}
          <strong>Estado:</strong> {vehicle.status} | <strong>Ruta:</strong> {vehicle.routeId} |{' '}
          <strong>Progreso:</strong> {vehicle.tripProgress}% | <strong>Latitud:</strong>{' '}
          {vehicle.lastPosition.latitude} | <strong>Longitud:</strong>{' '}
          {vehicle.lastPosition.longitude} | <strong>Velocidad:</strong> {vehicle.lastPosition.speed} km/h |{' '}
          <strong>Altitud:</strong> {vehicle.lastPosition.altitude} m |{' '}
          <strong>Precisión:</strong> {vehicle.lastPosition.accuracy} m |{' '}
          <strong>Última Actualización:</strong> {vehicle.lastPosition.timestamp} |{' '}
          <strong>Creado:</strong> {vehicle.created} | <strong>Actualizado:</strong> {vehicle.updated}
        </li>
      ))}
    </ul>
  );
};

export default VehiclesList;