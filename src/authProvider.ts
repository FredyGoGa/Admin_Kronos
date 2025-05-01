import AuthService from './authService';

// Usa la variable de entorno con el prefijo VITE_
const apiUrl = import.meta.env.VITE_API_URL || 'https://default-api-url.com'; // Obtiene la URL de la API
console.log('API URL:', apiUrl);

if (!apiUrl) {
  throw new Error('API URL is not defined. Please set VITE_API_URL in your .env file.');
}

const authService = new AuthService(apiUrl);

const authProvider = {
  login: async ({ username, password }: { username: string; password: string }) => {
    try {
      await authService.login(username, password);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  logout: () => {
    authService.logout();
    return Promise.resolve();
  },
  checkAuth: () => {
    return authService.isAuthenticated()
      ? Promise.resolve()
      : Promise.reject(new Error('Not authenticated'));
  },
  checkError: (error: { status: number }) => {
    if (error.status === 401 || error.status === 403) {
      authService.logout();
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => Promise.resolve(),
};

export default authProvider;