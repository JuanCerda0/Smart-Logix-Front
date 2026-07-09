// src/lib/components/services/api.client.ts <- Si la ruta no es esa hay que moverlo ahi si o si juan, si no me acuerdo se va a romper todo

const BFF_URL = import.meta.env.VITE_BFF_URL || 'http://localhost:8080';

interface FetchOptions extends RequestInit {
	body?: any;
}

export async function apiClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
	// 1. Obtener token y tenant desde el almacenamiento (usaremos localStorage por simplicidad temporal y caundo el back este bien conectado paso al postgre)
	const token = localStorage.getItem('auth_token');

	// 2. Configurar headers por defecto
	const headers = new Headers(options.headers);
	headers.set('Content-Type', 'application/json');

	if (token) {
		headers.set('Authorization', `Bearer ${token}`); //
	}

	// 3. Formatear el body si existe
	let body = options.body;
	if (body && typeof body === 'object') {
		body = JSON.stringify(body);
	}

	// 4. Construir URL completa limpia (evitar dobles slashes si el endpoint viene con /)
	const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
	const url = `${BFF_URL}${cleanEndpoint}`;

	try {
		const response = await fetch(url, {
			...options,
			headers,
			body
		});

		// 5. Manejo de errores de autenticación globales
		if (response.status === 401 || response.status === 403) {
			// Si el token expiró o hay conflicto multi-tenant, limpiamos y redirigimos (Muy probable que esto sea lo mas comun)
			localStorage.removeItem('auth_token');
			localStorage.removeItem('auth_tenant');
			window.location.href = '/login';
			throw new Error('Sesión expirada o no autorizada');
		}

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.message || `Error en la petición: ${response.status}`);
		}

		// Si la respuesta no tiene contenido (ej. un DELETE exitoso o un PATCH sin retorno)
		if (response.status === 204) {
			return {} as T;
		}

		return (await response.json()) as T;
	} catch (error) {
		console.error(`[API Client Error] en ${url}:`, error);
		throw error;
	}
}
