<script lang="ts">
    import LoginForm from '$lib/components/auth/LoginForm.svelte';
    import { authStore } from '$lib/store/auth';
    import { api } from '$lib/api/client';
    import { goto } from '$app/navigation';
    import '../lib/assets/global.css';

    let error = $state('');

    let currentTenant = $state('empresa1'); 

    async function handleLogin(username: string, password: string) {
        error = ''; 
        
        // 1. Seteamos provisionalmente el tenant en el store para que el cliente configure la ruta del login
        authStore.tenant = currentTenant;

        // 2. Ejecutamos la petición POST usando nuestro cliente API unificado
        const res = await api.post('/auth/login', { username, password }, true);

        if (res.error) {
            // Manejo de errores basado en el payload de validación del BFF
            if (res.status === 401) {
                error = res.data?.message || 'Usuario o contraseña incorrectos';
            } else {
                error = res.message || 'Error al conectar con el servidor';
            }
            return;
        }

        // 3. Si la respuesta es exitosa, guardamos en el store reactivo
        // El BFF devuelve { token, tokenType, expiresIn, tenant }
        const { token, tenant } = res.data;
        
        authStore.login(token, tenant);
        
        // 4. Redirección al panel principal
        goto('/');
    }

    let { children } = $props();
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

{@render children()}