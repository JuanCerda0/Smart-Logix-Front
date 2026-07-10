<script lang="ts">
	let { onLogin, errorMessage } = $props();

	let tenant = $state(''); // Necesario para la ruta multi-tenant del BFF
	let username = $state('');
	let password = $state('');

	function handleSubmit(e: Event) {
		e.preventDefault();
		// Pasamos los 3 datos al manejador del componente padre
		onLogin(tenant.trim(), username.trim(), password);
	}
</script>

<div class="login-card tarjeta">
	<form onsubmit={handleSubmit}>
		<h2>Bienvenido</h2>
		<p class="subtitle">Ingresa tus credenciales logísticas para continuar</p>

		{#if errorMessage}
			<div class="error-badge">{errorMessage}</div>
		{/if}

		<div class="form-group">
			<label for="tenant">Empresa / Tenant</label>
			<input type="text" id="tenant" bind:value={tenant} placeholder="Ej: empresa1" required />
		</div>

		<div class="form-group">
			<label for="username">Usuario</label>
			<input type="text" id="username" bind:value={username} placeholder="Ej: admin" required />
		</div>

		<div class="form-group">
			<label for="password">Contraseña</label>
			<input type="password" id="password" bind:value={password} placeholder="••••••••" required />
		</div>

		<button type="submit" class="btn-comprar"> Entrar a SmartLogix </button>
	</form>
</div>

<style>
	.login-card {
		width: 100%;
		max-width: 400px;
		padding: 2.5rem;
		background: white;
	}
	h2 {
		color: var(--color-texto-principal);
		margin-bottom: 0.5rem;
		text-align: center;
	}
	.subtitle {
		color: var(--color-texto-secundario);
		text-align: center;
		margin-bottom: 2rem;
		font-size: 0.9rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}
	label {
		font-weight: 600;
		color: var(--color-texto-principal);
		font-size: 0.9rem;
	}

	input {
		padding: 0.8rem;
		border: 1px solid #e2e8f0;
		border-radius: var(--radio-borde);
		outline-color: var(--color-primario);
	}

	.btn-comprar {
		width: 100%;
		margin-top: 1rem;
		cursor: pointer;
	}

	.error-badge {
		background: #fff5f5;
		color: #c53030;
		padding: 0.75rem;
		border-radius: var(--radio-borde);
		margin-bottom: 1.5rem;
		font-size: 0.85rem;
		border: 1px solid #feb2b2;
		text-align: center;
	}
</style>
