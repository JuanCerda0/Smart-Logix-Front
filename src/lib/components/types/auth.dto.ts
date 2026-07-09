// src/lib/types/auth.dto.ts

export interface LoginRequestDTO {
	username: string;
	password: string;
}

export interface AuthResponseDTO {
	token: string;
	tokenType: string;
	expiresIn: number;
	tenant: string; // ✨ CRÍTICO: El BFF lo devuelve y lo necesitamos para las rutas
}

export interface RegisterRequestDTO {
	username: string;
	password: string;
	email?: string; // Opcional por si el backend muta en el futuro
	fullName?: string; // Opcional
}
