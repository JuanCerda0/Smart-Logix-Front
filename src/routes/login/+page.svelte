<script lang="ts">
    import LoginForm from '$lib/components/auth/LoginForm.svelte';
    import { authService } from '$lib/components/services/auth.service'; 
    import type { LoginRequestDTO } from '$lib/components/types/auth.dto'; 
    import { goto } from '$app/navigation';

    let error = $state('');

    async function handleLogin(username: string, password: string) {
        error = ''; 
        try {
            // Creamos el objeto usando el DTO explícitamente
            const credentials: LoginRequestDTO = { username, password };
            
            // Pasamos las credenciales ya tipadas al servicio
            const response = await authService.login(credentials);
            
            localStorage.setItem('token', response.token);
            goto('/');
        } catch (e) { // Quitamos el ': any'
            // Comprobamos de forma segura si el error capturado es un objeto Error
            if (e instanceof Error) {
                error = e.message;
            } else {
                error = 'Error al conectar con el servidor';
            }
        }
    }
</script>

<main class="login-page">
    <LoginForm onLogin={handleLogin} errorMessage={error} />
</main>

<style>
    .login-page {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 80px); /* Ajustado por el TopBar */
        background-color: var(--color-fondo);
    }
</style>