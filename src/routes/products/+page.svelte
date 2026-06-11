<script lang="ts">
    import { onMount } from 'svelte';
    import ProductCard from '$lib/components/products/ProductCard.svelte';
    import { productService } from '$lib/components/services/product.service';
    import type { ProductResponseDTO } from '$lib/components/types/product.dto';
    
    import Topbar from '$lib/components/layout/TopBar/topbar.svelte';
    import { goto } from '$app/navigation';

    let products = $state<ProductResponseDTO[]>([]);
    let isLoading = $state(true);
    let error = $state('');

    const links = [
        { label: 'Inicio',    href: '/' },
        { label: 'Productos', href: '/products', active: true },
        { label: 'Blog',      href: '/blog'      },
        { label: 'Contacto',  href: '/contacto'  },
    ];

    function handleNav(e: { href: string; label: string }) {
        goto(e.href);
    }

    async function loadProducts() {
        try {
            isLoading = true;
            products = await productService.findAll();
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

    onMount(() => {
        loadProducts();
    });
</script>

<Topbar {links} sticky onnavigate={handleNav}>
    {#snippet logo()}
        <img src="/logo.png" alt="SmartLogix" height="28" />
    {/snippet}

    {#snippet actions()}
        <a href="/login" class="btn-comprar" style="text-decoration: none; text-align: center;">
            Ingresar
        </a>
        <a href="/register" class="btn-comprar" style="text-decoration: none; text-align: center;">
            Registrarse
        </a>
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
        <div class="status-message error-container">
            <p class="error-text">error {error}</p>
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
        background: #fff5f5;
        border: 1px solid #feb2b2;
        border-radius: var(--radio-borde);
        padding: 2rem;
    }

    .error-text {
        color: #c53030;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    /* Animación simple de carga */
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid var(--color-primario);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>