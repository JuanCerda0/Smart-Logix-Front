// src/lib/components/services/auth.service.ts
import { api } from './api.client';
import type { LoginRequestDTO, RegisterRequestDTO, AuthResponseDTO } from '../types/auth.dto';

class AuthState {
	isAuthenticated: boolean;
	tenant: string;

	constructor() {
		this.isAuthenticated =
			typeof localStorage !== 'undefined' && !!localStorage.getItem('auth_token');
		this.tenant =
			typeof localStorage !== 'undefined' ? localStorage.getItem('auth_tenant') || '' : '';
	}

	async login(tenantForm: string, credentials: LoginRequestDTO): Promise<boolean> {
		const path = `/${tenantForm}/api/auth/login`;

		const response = await api.post<AuthResponseDTO>(path, credentials, true);

		if (response.error || !response.data) {
			this.logout();
			throw new Error(response.message || 'Error de autenticación');
		}

		localStorage.setItem('auth_token', response.data.token);
		localStorage.setItem('auth_tenant', response.data.tenant);

		this.tenant = response.data.tenant;
		this.isAuthenticated = true;

		return true;
	}

	async register(tenantParam: string, userData: RegisterRequestDTO): Promise<boolean> {
		const path = `/${tenantParam}/api/auth/register`;
		const response = await api.post<void>(path, userData, true);

		if (response.error) {
			throw new Error(response.message || 'Error en el registro');
		}
		return true;
	}

	logout() {
		localStorage.removeItem('auth_token');
		localStorage.removeItem('auth_tenant');
		this.isAuthenticated = false;
		this.tenant = '';
	}
}

export const authService = new AuthState();
