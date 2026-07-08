<script lang="ts">
    import { onMount } from 'svelte';
    import ProductCard from '$lib/components/products/ProductCard.svelte';
    import { api } from '$lib/api/client';
    import { authStore } from '$lib/store/auth';
    import type { ProductResponseDTO } from '$lib/components/types/product.dto';
    
    import Topbar from '$lib/components/layout/TopBar/topbar.svelte';
    import { goto } from '$app/navigation';

    import '$lib/assets/global.css';

    let products = $state<ProductResponseDTO[]>([]);
    let isLoading = $state(true);
    let error = $state('');

    // Evaluamos el estado de autenticación de forma reactiva con Runes de Svelte 5
    let isAuthenticated = $derived(authStore.isAuthenticated);

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

            // Consumimos el endpoint GET /{tenant}/api/products unificado
            const res = await api.get('/products');

            if (res.error) {
                if (res.status === 401) {
                    error = 'Sesión expirada o inválida. Por favor, inicia sesión de nuevo.';
                } else if (res.status === 403) {
                    error = 'Acceso denegado: Conflicto de organización (tenant).';
                } else {
                    error = res.data?.message || 'Error al cargar los productos del inventario';
                }
                return;
            }

            products = res.data || [];
        } catch (e) {
            if (e instanceof Error) {
                error = e.message;
            } else {
                error = 'Ocurrió un error inesperado al cargar los productos';
            }
        } finally {
            isLoading = false;
        }
    }

    function handleLogout() {
        authStore.logout();
    }

    onMount(() => {
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
        <p>Gestión de productos y stock en tiempo real</p>
    </header>

    {#if isLoading}
        <div class="status-message">
            <div class="spinner"></div>
            <p>Cargando catálogo...</p>
        </div>
    {:else if error}
        <div class="status-message tarjeta error-container">
            <p class="error-text">Error: {error}</p>
            <button class="btn-comprar" onclick={loadProducts}>Reintentar</button>
        </div>
    {:else if products.length === 0}
        <div class="status-message">
            <p>No hay productos disponibles en el inventario.</p>
        </div>
    {:else}
        <div class="products-grid">
            {#each products as product (product.id)}
                <ProductCard {product} />
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