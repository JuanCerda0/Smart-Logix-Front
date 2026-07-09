<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { authService } from '$lib/components/services/auth.service';
    import { productService } from '$lib/components/services/product.service';
    import ProductCard from '$lib/components/products/ProductCard.svelte';
    import Topbar from '$lib/components/layout/TopBar/topbar.svelte';
    import type { ProductResponseDTO } from '$lib/components/types/product.dto';
    
    import '$lib/assets/global.css';

    let products = $state<ProductResponseDTO[]>([]);
    let isLoading = $state(true);
    let error = $state('');

    // ✨ CORREGIDO: Evaluamos usando las Runes nativas del nuevo authService reactivo
    let isAuthenticated = $derived(authService.isAuthenticated);

    const links = [
        { label: 'Inicio',    href: '/' },
        { label: 'Productos', href: '/products', active: true },
        { label: 'Nosotros',  href: '/nosotros' },
        { label: 'Contacto',  href: '/contacto'  },
    ];

    function handleNav(e: { href: string; label: string }) {
        goto(e.href);
    }

    async function loadProducts() {
        try {
            isLoading = true;
            error = '';

            products = await productService.findAll();
        } catch (e: any) {
            // Captura los errores semánticos formateados por nuestro servicio (401, 403, etc.)
            error = e.message || 'Ocurrió un error inesperado al cargar los productos';
        } finally {
            isLoading = false;
        }
    }

    function handleLogout() {
        authService.logout();
        goto('/login');
    }

    onMount(() => {
        // EL GUARDIÁN DE SEGURIDAD CRÍTICO:
        // Si el usuario no está validado, no lo dejamos cargar productos y lo mandamos al login.
        if (!authService.isAuthenticated) {
            goto('/login');
            return;
        }

        // Si superó la validación, descargamos el inventario de su tenant
        loadProducts();
    });
</script>

<Topbar {links} sticky onnavigate={handleNav}>
    {#snippet logo()}
        <img src="/logo.png" alt="SmartLogix" height="28" />
    {/snippet}

    {#snippet actions()}
        {#if !isAuthenticated}
            <a href="/login" class="btn-comprar" style="text-decoration: none; text-align: center;">
                Ingresar
            </a>
            <a href="/register" class="btn-comprar" style="text-decoration: none; text-align: center;">
                Registrarse
            </a>
        {:else}
            <button class="btn-comprar" style="background-color: var(--color-texto-secundario);" onclick={handleLogout}>
                Cerrar Sesión 
            </button>
        {/if}
    {/snippet}
</Topbar> 

<div class="products-container">
    <header class="catalog-header">
        <h1>Catálogo de Inventario</h1>
        <p>Gestión de productos en tiempo real — Organización: <span class="tenant-tag">{authService.tenant}</span></p>
    </header>

    {#if isLoading}
        <div class="status-message">
            <div class="spinner"></div>
            <p>Sincronizando catálogo...</p>
        </div>
    {:else if error}
        <div class="status-message tarjeta error-container">
            <p class="error-text">⚠️ {error}</p>
            <button class="btn-comprar" onclick={loadProducts}>Reintentar Conexión</button>
        </div>
    {:else if products.length === 0}
        <div class="status-message tarjeta">
            <p>No hay productos disponibles registrados en el inventario de este tenant.</p>
        </div>
    {:else}
        <div class="products-grid">
            {#each products as product (product.id)}
                <ProductCard 
                    {product} 
                    onUpdate={loadProducts} 
                    onDelete={(id) => products = products.filter(p => p.id !== id)} 
                />
            {/each}
        </div>
    {/if}
</div>

<style>
    .products-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .catalog-header {
        margin-bottom: 3rem;
        text-align: center;
    }

    .catalog-header h1 {
        font-size: 2.5rem;
        color: var(--color-texto-principal);
        margin-bottom: 0.5rem;
    }

    .catalog-header p {
        color: var(--color-texto-secundario);
        font-size: 1.1rem;
    }

    .tenant-tag {
        font-weight: 700;
        color: var(--color-accion);
        text-transform: uppercase;
    }

    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
    }

    .status-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 300px;
        text-align: center;
    }

    .error-container {
        background-color: #fff5f5; 
        border-color: #feb2b2;
        padding: 2rem;
    }

    .error-text {
        color: #c53030;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #e2e8f0;
        border-top: 4px solid var(--color-accion);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>