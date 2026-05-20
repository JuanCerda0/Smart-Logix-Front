<script lang="ts">
    // Recibe props y eventos del Container
    let { onLogin, error } = $props();
    let email = $state('');
    let password = $state('');
</script>

<form onsubmit={(e) => { e.preventDefault(); onLogin(email, password); }} class="tarjeta">
    <h2 style="color: var(--color-texto-principal)">Ingresar</h2>
    {#if error}<p class="error">{error}</p>{/if}
    
    <input type="email" bind:value={email} placeholder="Email" required />
    <input type="password" bind:value={password} placeholder="Contraseña" required />
    
    <button type="submit" class="btn-comprar">Iniciar Sesión</button>
</form>