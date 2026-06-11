<script lang="ts">
    import RegisterForm from '$lib/components/auth/RegisterForm.svelte';
    import { authService } from '$lib/components/services/auth.service';
    import type { RegisterRequestDTO } from '$lib/components/types/auth.dto';
    import { goto } from '$app/navigation';

    let error = $state('');

    async function handleRegister(userData: RegisterRequestDTO) {
        error = ''; 
        try {
            await authService.register(userData);
            
            // Si el backend responde OK (cuando esté implementado),
            // redirigimos al login para que el usuario inicie sesión.
            alert('¡Registro exitoso! Por favor inicia sesión.');
            goto('/login');
            
        } catch (e) {
            // Manejamos el error sin usar 'any' para complacer a ESLint
            if (e instanceof Error) {
                error = e.message;
            } else {
                error = 'Error al intentar registrar el usuario';
            }
        }
    }
</script>

<main class="register-page">
    <RegisterForm onRegister={handleRegister} errorMessage={error} />
</main>

<style>
    .register-page {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 80px);
        background-color: var(--color-fondo);
        padding: 2rem 1rem;
    }
</style>