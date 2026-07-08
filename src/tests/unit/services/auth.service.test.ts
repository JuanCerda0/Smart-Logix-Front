import { describe, it, expect, beforeEach, vi } from 'vitest';
import { authService } from '../../../lib/components/services/auth.service';
import { api } from '../../../lib/components/services/api.client';

// Simulamos el cliente de API global
vi.mock('./api.client', () => ({
    api: {
        post: vi.fn()
    }
}));

describe('AuthService con Svelte 5 Runes', () => {
    beforeEach(() => {
        localStorage.clear();
        authService.logout();
        vi.clearAllMocks();
    });

    it('Debería inicializarse como no autenticado y sin tenant', () => {
        expect(authService.isAuthenticated).toBe(false);
        expect(authService.tenant).toBe('');
    });

    it('Debería loguearse exitosamente, guardar en localStorage y activar la reactividad', async () => {
        // Simulamos una respuesta exitosa del BFF
        const mockResponse = {
            error: false,
            status: 200,
            data: { token: 'jwt-123', tenant: 'empresa1' }
        };
        vi.mocked(api.post).mockResolvedValue(mockResponse);

        const result = await authService.login('empresa1', { username: 'admin', password: '123' });

        // Verificaciones
        expect(result).toBe(true);
        expect(authService.isAuthenticated).toBe(true);
        expect(authService.tenant).toBe('empresa1');
        expect(localStorage.getItem('auth_token')).toBe('jwt-123');
        expect(localStorage.getItem('auth_tenant')).toBe('empresa1');
    });

    it('Debería lanzar un error si las credenciales fallan', async () => {
        const mockErrorResponse = {
            error: true,
            status: 401,
            data: null,
            message: 'Usuario o contraseña incorrectos'
        };
        vi.mocked(api.post).mockResolvedValue(mockErrorResponse);

        await expect(
            authService.login('empresa1', { username: 'baduser', password: 'bad' })
        ).rejects.toThrow('Usuario o contraseña incorrectos');

        expect(authService.isAuthenticated).toBe(false);
    });
});