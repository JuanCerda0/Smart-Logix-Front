<script lang="ts">
	import LoginForm from '../../lib/components/auth/LoginForm.svelte';
	import { authService } from '../../lib/components/services/auth.service';
	import { goto } from '$app/navigation';
	import '$lib/assets/global.css';

	let error = $state('');

	// Ahora handleLogin acepta los 3 parámetros que envía el nuevo LoginForm
	async function handleLogin(tenant: string, username: string, password: string) {
		error = '';

		try {
			// El servicio encapsula de forma segura la petición al BFF,
			// la validación de errores y la persistencia del token/tenant.
			await authService.login(tenant, { username, password });

			// Redirección exitosa al dashboard principal
			goto('/');
		} catch (err: any) {
			// Captura los errores lanzados por el cliente o el servicio
			error = err.message || 'Error de credenciales o conexión con el BFF';
		}
	}

	let { children } = $props();
</script>

// lib/routes/login/+page.svelte
<main class="login-page">
	<LoginForm onLogin={handleLogin} errorMessage={error} />
</main>

{#if children}
	{@render children()}
{/if}

<style>
	.login-page {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: calc(100vh - 80px); /* Ajustado por el TopBar */
		background-color: var(--color-fondo);
	}
</style>
