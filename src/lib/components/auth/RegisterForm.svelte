<script lang="ts">
    import type { RegisterRequestDTO } from '$lib/components/types/auth.dto';

    // Recibimos la función y el error desde el Container (Padre)
    let { onRegister, errorMessage } = $props();
    
    let fullName = $state('');
    let username = $state('');
    let email = $state('');
    let password = $state('');

    function handleSubmit(e: Event) {
        e.preventDefault();
        // Construimos el DTO y se lo pasamos al padre
        const userData: RegisterRequestDTO = { username, email, password, fullName };
        onRegister(userData);
    }
</script>

<div class="login-card tarjeta">
    <form onsubmit={handleSubmit}>
        <h2>Crear Cuenta</h2>
        <p class="subtitle">Únete a SmartLogix hoy mismo</p>

        {#if errorMessage}
            <div class="error-badge">{errorMessage}</div>
        {/if}

        <div class="form-group">
            <label for="fullName">Nombre Completo</label>
            <input 
                type="text" 
                id="fullName" 
                bind:value={fullName} 
                placeholder="Ej: Juan Cerda" 
                required 
            />
        </div>

        <div class="form-group">
            <label for="username">Nombre de Usuario</label>
            <input 
                type="text" 
                id="username" 
                bind:value={username} 
                placeholder="Ej: jperez" 
                required 
            />
        </div>

        <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input 
                type="email" 
                id="email" 
                bind:value={email} 
                placeholder="juan@ejemplo.com" 
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
                minlength="6"
            />
        </div>

        <button type="submit" class="btn-comprar">
            Registrarse
        </button>
        
        <p class="login-link">
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
    </form>
</div>

<style>
    /* Mismos estilos que el Login para mantener consistencia */
    .login-card { width: 100%; max-width: 450px; padding: 2.5rem; background: white; margin: 2rem auto; }
    h2 { color: var(--color-texto-principal); margin-bottom: 0.5rem; text-align: center; }
    .subtitle { color: var(--color-texto-secundario); text-align: center; margin-bottom: 2rem; font-size: 0.9rem; }
    
    .form-group { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.2rem; }
    label { font-weight: 600; color: var(--color-texto-principal); font-size: 0.9rem; }
    
    input { padding: 0.8rem; border: 1px solid #E2E8F0; border-radius: var(--radio-borde); outline-color: var(--color-primario); }
    .btn-comprar { width: 100%; margin-top: 1rem; cursor: pointer; }
    
    .error-badge { background: #FFF5F5; color: #C53030; padding: 0.75rem; border-radius: var(--radio-borde); margin-bottom: 1.5rem; font-size: 0.85rem; border: 1px solid #FEB2B2; text-align: center; }
    
    .login-link { text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: var(--color-texto-secundario); }
    .login-link a { color: var(--color-primario); font-weight: bold; text-decoration: none; }
</style>