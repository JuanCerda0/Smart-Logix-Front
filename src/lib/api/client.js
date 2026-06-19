// src/lib/api/client.js
import { authStore } from '../store/auth';

const BASE_URL = import.meta.env.VITE_BFF_URL || 'http://localhost:8080';

/**
 * Función base para realizar peticiones HTTP tipada para TypeScript.
 * * @param {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} method - El método HTTP.
 * @param {string} path - El endpoint (ej: '/products' o '/auth/login').
 * @param {any} [body=null] - El cuerpo de la petición (opcional).
 * @param {boolean} [isAuthRoute=false] - Indica si es una ruta de autenticación.
 * @returns {Promise<{error: boolean, status: number, data?: any, message?: string, details?: any}>}
 */
async function request(method, path, body = null, isAuthRoute = false) {
    let url = '';

    if (isAuthRoute) {
        // Las rutas de auth también llevan el tenant en el path según la guía
        url = `${BASE_URL}/${authStore.tenant || 'default'}/api${path}`;
    } else {
        // Rutas normales de negocio (ej: /products)
        if (!authStore.tenant) {
            authStore.logout();
            throw new Error('No se ha definido un tenant activo.');
        }
        url = `${BASE_URL}/${authStore.tenant}/api${path}`;
    }

    /** @type {Record<string, string>} */
    const headers = {
        'Content-Type': 'application/json'
    };

    // Si el usuario está autenticado, inyectamos el Bearer Token
    if (authStore.token) {
        headers['Authorization'] = `Bearer ${authStore.token}`;
    }

    /** @type {RequestInit} */
    const config = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    };

    try {
        const response = await fetch(url, config);

        // Si es 204 No Content (como en el DELETE de productos)
        if (response.status === 204) {
            return { error: false, status: response.status, data: null };
        }

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            // Manejo de Errores Críticos Globales de la Guía
            if (response.status === 401 || response.status === 403) {
                authStore.logout(); // Redirige a login automáticamente
            }
            
            return { error: true, status: response.status, data };
        }

        return { error: false, status: response.status, data };
    } catch (err) {
        return { error: true, status: 0, message: 'Error de red o CORS no configurado en el BFF', details: err };
    }
}

// Exponer los métodos HTTP limpios con autocompletado e inferencia de tipos
export const api = {
    /** @param {string} path */
    get: (path) => request('GET', path),
    
    /** * @param {string} path 
     * @param {any} body 
     * @param {boolean} [isAuth=false]
     */
    post: (path, body, isAuth = false) => request('POST', path, body, isAuth),
    
    /** * @param {string} path 
     * @param {any} body 
     */
    put: (path, body) => request('PUT', path, body),
    
    /** * @param {string} path 
     * @param {any} body 
     */
    patch: (path, body) => request('PATCH', path, body),
    
    /** @param {string} path */
    delete: (path) => request('DELETE', path)
};