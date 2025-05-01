class AuthService {
    private apiUrl: string;
    private authKey = 'auth'; // Clave para almacenar datos en localStorage
  
    constructor(apiUrl: string) {
      this.apiUrl = apiUrl.replace(/\/$/, ''); // Elimina la barra final si existe
    }
  
    async login(username: string, password: string): Promise<void> {
      try {
        const response = await fetch(`${this.apiUrl}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          throw new Error('Invalid username or password');
        }
  
        const data = await response.json();
        localStorage.setItem(this.authKey, JSON.stringify(data)); // Guarda los tokens o datos del usuario
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Login failed: ${error.message}`);
        } else {
          throw new Error('Login failed: An unknown error occurred');
        }
      }
    }
  
    logout(): void {
      localStorage.removeItem(this.authKey); // Elimina los datos de autenticación
    }
  
    isAuthenticated(): boolean {
      const authData = localStorage.getItem(this.authKey);
      return !!authData; // Devuelve true si hay datos de autenticación
    }
  
    getAuthHeader(): Record<string, string> {
      const authData = localStorage.getItem(this.authKey);
      if (!authData) {
        throw new Error('Not authenticated');
      }
  
      const { token } = JSON.parse(authData); // Asegúrate de que tu API devuelva un token
      return { Authorization: `Bearer ${token}` };
    }
  }
  
  export default AuthService;