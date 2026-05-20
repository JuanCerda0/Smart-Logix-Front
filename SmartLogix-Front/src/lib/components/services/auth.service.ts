// src/lib/services/auth.service.ts
import type { LoginRequestDTO, AuthResponseDTO } from '$lib/components/types/auth.dto';
const API_URL = 'http://localhost:8080/api/auth'; // Ruta base de tu AuthController

export const authService = {
    async login(credentials: LoginRequestDTO): Promise<AuthResponseDTO> {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            // Aquí puedes manejar errores específicos de tu backend
            throw new Error('Error de autenticación');
        }

        return await response.json();
    }
};