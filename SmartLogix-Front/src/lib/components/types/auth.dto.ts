// src/lib/types/auth.dto.ts

/** * Coincide con LoginRequest.java (record)
 */
export interface LoginRequestDTO {
    username: string; // Cambiado de 'email' a 'username' según tu record
    password: string;
}

/** * Coincide con LoginResponse.java (record)
 */
export interface AuthResponseDTO {
    token: string;
    tokenType: string;
    expiresIn: number;
}