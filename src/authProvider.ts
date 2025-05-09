// Usa la variable de entorno con el prefijo VITE_
const apiUrl = import.meta.env.VITE_API_URL || 'https://default-api-url.com'; // Obtiene la URL de la API
console.log('API URL:', apiUrl);

if (!apiUrl) {
  throw new Error('API URL is not defined. Please set VITE_API_URL in your .env file.');
}

const authProvider = {
  login: async ({ username, password }: { username: string; password: string }) => {
    const request = new Request(`${apiUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
  
    const response = await fetch(request);
    console.log('Respuesta completa:', response);  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    try {
      const responseData = await response.json();
      console.log('Datos de la respuesta:', responseData);
  
      const { idToken  } = responseData; // Ajusta según el formato de la respuesta
      if (!idToken ) {
        throw new Error('Token no encontrado en la respuesta');
      }
  
      localStorage.setItem('authToken', idToken );
      console.log('Token:', idToken);
      return Promise.resolve();
    } catch (error) {
      console.error('Error al procesar la respuesta:', error);
      throw new Error('Error al procesar la respuesta del servidor');
    }
  },
  logout: () => {
    localStorage.removeItem('authToken'); // Elimina el token al cerrar sesión
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem('authToken')
      ? Promise.resolve()
      : Promise.reject(new Error('Not authenticated'));
  },
  checkError: (error: { status: number }) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('authToken');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
};

export default authProvider;