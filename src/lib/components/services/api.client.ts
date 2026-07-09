// src/lib/components/services/api.client.ts
import { authService } from './auth.service';

const BASE_URL = import.meta.env.VITE_BFF_URL || 'http://localhost:8080';

export interface ApiResponse<T> {
	error: boolean;
	status: number;
	data: T | null;
	message?: string;
	details?: any;
}

/**
 * Función base adaptada para TypeScript y Svelte 5.
 */
async function request<T>(
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
	path: string,
	body: any = null,
	isAuthRoute = false
): Promise<ApiResponse<T>> {
	let url = '';

	// Intentamos recuperar el token de localStorage si el servicio aún se está inicializando
	const token = localStorage.getItem('auth_token');
	// Leemos el tenant reactivo desde el authService (Svelte 5 Runes)
	const currentTenant = authService.tenant || localStorage.getItem('auth_tenant');

	if (isAuthRoute) {
		// Rutas de auth (login/register) necesitan el tenant temporal enviado por el formulario
		url = `${BASE_URL}${path}`;
	} else {
		// Rutas normales de negocio (ej: /products)
		if (!currentTenant) {
			authService.logout();
			throw new Error('No se ha definido un tenant activo.');
		}
		// Limpiamos barras duplicadas por si acaso
		const cleanPath = path.startsWith('/') ? path : `/${path}`;
		url = `${BASE_URL}/${currentTenant}/api${cleanPath}`;
	}

	const headers: Record<string, string> = {
		'Content-Type': 'application/json'
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	const config: RequestInit = {
		method,
		headers,
		body: body ? JSON.stringify(body) : null
	};

	try {
		const response = await fetch(url, config);

		if (response.status === 204) {
			return { error: false, status: response.status, data: null };
		}

		const data = await response.json().catch(() => ({}));

		if (!response.ok) {
			if (response.status === 401 || response.status === 403) {
				authService.logout(); // Fuerza el logout reactivo instantáneo en Svelte 5
			}
			return {
				error: true,
				status: response.status,
				data: null,
				message: data.message || 'Error en la petición'
			};
		}

		return { error: false, status: response.status, data: data as T };
	} catch (err) {
		return {
			error: true,
			status: 0,
			data: null,
			message: 'Error de red o CORS no configurado en el BFF',
			details: err
		};
	}
}

// Exportamos la API con soporte completo de Genéricos <T> para tipar las respuestas de tus DTOs
export const api = {
	get: <T>(path: string) => request<T>('GET', path),

	post: <T>(path: string, body: any, isAuth = false) => request<T>('POST', path, body, isAuth),

	put: <T>(path: string, body: any) => request<T>('PUT', path, body),

	patch: <T>(path: string, body: any) => request<T>('PATCH', path, body),

	delete: <T>(path: string) => request<T>('DELETE', path)
};
