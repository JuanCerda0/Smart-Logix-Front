// src/lib/components/services/auth.service.ts
import { api } from './api.client';
import type { LoginRequestDTO, RegisterRequestDTO, AuthResponseDTO } from '../types/auth.dto';

class AuthState {
  #isAuthenticated = $state(!!localStorage.getItem('auth_token'));
  #tenant = $state(localStorage.getItem('auth_tenant') || '');

  get isAuthenticated() { return this.#isAuthenticated; }
  get tenant() { return this.#tenant; }

  async login(tenantForm: string, credentials: LoginRequestDTO): Promise<boolean> {
    // Construimos la ruta dinámica de login para el BFF: /{tenant}/api/auth/login
    const path = `/${tenantForm}/api/auth/login`;
    
    const response = await api.post<AuthResponseDTO>(path, credentials, true);

    if (response.error || !response.data) {
      this.logout();
      throw new Error(response.message || 'Error de autenticación');
    }

    // Persistencia
    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('auth_tenant', response.data.tenant);

    // Reactividad Runes Svelte 5
    this.#tenant = response.data.tenant;
    this.#isAuthenticated = true;

    return true;
  }

  async register(tenantForm: string, userData: RegisterRequestDTO): Promise<boolean> {
    const path = `/${tenantForm}/api/auth/register`;
    const response = await api.post<void>(path, userData, true);
    
    if (response.error) {
      throw new Error(response.message || 'Error en el registro');
    }
    return true;
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_tenant');
    this.#isAuthenticated = false;
    this.#tenant = '';
  }
}

export const authService = new AuthState();