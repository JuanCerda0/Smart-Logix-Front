// src/lib/services/auth.service.ts
import type { LoginRequestDTO, AuthResponseDTO, RegisterRequestDTO } from '$lib/components/types/auth.dto';
const API_URL = 'http://localhost:8080/api/auth'; 

export const authService = {
    async login(credentials: LoginRequestDTO): Promise<AuthResponseDTO> {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error('Error de autenticación');
        }

        return await response.json();
    }, // <--- ¡AQUÍ VA LA COMA PARA SEPARAR LAS FUNCIONES!

    async register(userData: RegisterRequestDTO): Promise<void> {
        const response = await fetch(`${API_URL}/signup`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('El registro no está disponible actualmente');
        }
    }
};