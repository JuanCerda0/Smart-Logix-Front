<script lang="ts">
    import type { ProductResponseDTO } from '$lib/components/types/product.dto';

    // Recibimos el producto como prop usando la runa $props
    let { product }: { product: ProductResponseDTO } = $props();

    // Lógica visual: Determinar si el stock es bajo para alertar al usuario
    const isLowStock = $derived(product.stock > 0 && product.stock <= 5);
    const outOfStock = $derived(product.stock === 0);
</script>

<div class="product-card tarjeta" class:out-of-stock={outOfStock}>
    <div class="card-header">
        <span class="category-badge">{product.category}</span>
        <span class="sku-text">SKU: {product.sku}</span>
    </div>

    <div class="card-body">
        <h3>{product.name}</h3>
        <p class="description">{product.description}</p>
        
        <div class="price-tag">
            ${product.unitPrice.toLocaleString('es-CL')} 
            <span class="unit">/ unidad</span>
        </div>
    </div>

    <div class="card-footer">
        <div class="stock-info">
            <span class="stock-label">Disponibilidad:</span>
            <span class="stock-value" class:warning={isLowStock} class:danger={outOfStock}>
                {product.stock} unidades
            </span>
        </div>

        <button 
            class="btn-comprar" 
            disabled={outOfStock}
        >
            {outOfStock ? 'Sin Stock' : 'Añadir al Carrito'}
        </button>
    </div>
</div>

<style>
    .product-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1.5rem;
        background: white;
        transition: transform 0.2s;
        border: 1px solid #eef2f6;
    }

    .product-card:hover {
        transform: translateY(-4px);
    }

    .out-of-stock {
        opacity: 0.7;
        filter: grayscale(0.5);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .category-badge {
        background: var(--color-fondo);
        color: var(--color-primario);
        padding: 0.25rem 0.6rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
    }

    .sku-text {
        font-size: 0.7rem;
        color: var(--color-texto-secundario);
        font-family: monospace;
    }

    h3 {
        margin: 0 0 0.5rem 0;
        color: var(--color-texto-principal);
        font-size: 1.2rem;
    }

    .description {
        font-size: 0.9rem;
        color: var(--color-texto-secundario);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 1rem;
    }

    .price-tag {
        font-size: 1.4rem;
        font-weight: 800;
        color: var(--color-primario);
        margin-bottom: 1.5rem;
    }

    .unit {
        font-size: 0.8rem;
        color: var(--color-texto-secundario);
        font-weight: 400;
    }

    .stock-info {
        display: flex;
        justify-content: space-between;
        font-size: 0.85rem;
        margin-bottom: 1rem;
    }

    .stock-value {
        font-weight: 700;
    }

    .warning { color: #f59e0b; }
    .danger { color: #ef4444; }

    .btn-comprar {
        width: 100%;
        cursor: pointer;
    }

    .btn-comprar:disabled {
        background-color: #cbd5e1;
        cursor: not-allowed;
    }
</style>