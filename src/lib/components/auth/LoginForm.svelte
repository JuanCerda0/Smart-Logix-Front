<script lang="ts">
    // Recibimos la función de login y el mensaje de error como props
    let { onLogin, errorMessage } = $props();
    
    let username = $state('');
    let password = $state('');

    function handleSubmit(e: Event) {
        e.preventDefault();
        onLogin(username, password);
    }
</script>

<div class="login-card tarjeta">
    <form onsubmit={handleSubmit}>
        <h2>Bienvenido</h2>
        <p class="subtitle">Ingresa tus credenciales para continuar</p>

        {#if errorMessage}
            <div class="error-badge">{errorMessage}</div>
        {/if}

        <div class="form-group">
            <label for="username">Usuario</label>
            <input 
                type="text" 
                id="username" 
                bind:value={username} 
                placeholder="Ej: jsmith" 
                required 
            />
        </div>

        <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
                type="password" 
                id="password" 
                bind:value={password} 
                placeholder="••••••••" 
                required 
            />
        </div>

        <button type="submit" class="btn-comprar">
            Entrar a SmartLogix
        </button>
    </form>
</div>

<style>
    .login-card {
        width: 100%;
        max-width: 400px;
        padding: 2.5rem;
        background: white;
    }
    h2 { color: var(--color-texto-principal); margin-bottom: 0.5rem; text-align: center; }
    .subtitle { color: var(--color-texto-secundario); text-align: center; margin-bottom: 2rem; font-size: 0.9rem; }
    
    .form-group { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
    label { font-weight: 600; color: var(--color-texto-principal); font-size: 0.9rem; }
    
    input {
        padding: 0.8rem;
        border: 1px solid #E2E8F0;
        border-radius: var(--radio-borde);
        outline-color: var(--color-primario);
    }

    .btn-comprar { width: 100%; margin-top: 1rem; cursor: pointer; }
    
    .error-badge {
        background: #FFF5F5;
        color: #C53030;
        padding: 0.75rem;
        border-radius: var(--radio-borde);
        margin-bottom: 1.5rem;
        font-size: 0.85rem;
        border: 1px solid #FEB2B2;
        text-align: center;
    }
</style>