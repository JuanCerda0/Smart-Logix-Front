<script lang="ts">
    import type { ProductResponseDTO } from '../types/product.dto';
    import { productService } from '../services/product.service';

    let { 
        product, 
        onUpdate = () => {}, 
        onDelete = () => {} 
    }: { 
        product: ProductResponseDTO; 
        onUpdate?: () => void; 
        onDelete?: (id: number) => void; 
    } = $props();

    const isLowStock = $derived(product.stock > 0 && product.stock <= 5);
    const outOfStock = $derived(product.stock === 0);

    let isEditingStock = $state(false);
    let newStockValue = $state(product.stock);

    async function handleUpdateStock() {
        try {
            await productService.updateStock(product.id, { stock: newStockValue });
            isEditingStock = false;
            onUpdate(); 
        } catch (err: any) {
            alert(err.message || 'No se pudo actualizar el stock');
        }
    }

    async function handleDeleteProduct() {
        if (confirm(`¿Estás seguro de eliminar el producto ${product.name}?`)) {
            try {
                await productService.delete(product.id);
                onDelete(product.id); 
            } catch (err: any) {
                alert(err.message || 'Error al eliminar el producto');
            }
        }
    }
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
            
            {#if isEditingStock}
                <div class="stock-edit-form">
                    <input type="number" min="0" bind:value={newStockValue} class="stock-input" />
                    <button onclick={handleUpdateStock} class="btn-mini-save">✓</button>
                    <button onclick={() => isEditingStock = false} class="btn-mini-cancel">✗</button>
                </div>
            {:else}
                <span 
                    class="stock-value" 
                    class:warning={isLowStock} 
                    class:danger={outOfStock}
                    role="button"
                    tabindex="0"
                    ondblclick={() => { isEditingStock = true; newStockValue = product.stock; }}
                    onkeydown={(e) => { if (e.key === 'Enter') { isEditingStock = true; newStockValue = product.stock; } }}
                    title="Doble clic para editar stock rápidamente"
                >
                    {product.stock} unidades ✏️
                </span>
            {/if}
        </div>

        <div class="actions-group">
            <button 
                class="btn-comprar" 
                disabled={outOfStock}
            >
                {outOfStock ? 'Sin Stock' : 'Añadir al Carrito'}
            </button>
            
            <button onclick={handleDeleteProduct} class="btn-eliminar" title="Eliminar del inventario">
                🗑️
            </button>
        </div>
    </div>
</div>

<style>
    /* ✨ SOLO LO NECESARIO:
       Eliminados los bloques de .tarjeta y .btn-comprar. 
       Solo dejamos las reglas de posicionamiento y variables de color heredadas.
    */
    .product-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: transform 0.2s;
    }

    .product-card:hover {
        transform: translateY(-4px);
    }

    .out-of-stock {
        opacity: 0.6;
        filter: grayscale(0.3);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .category-badge {
        background: var(--color-fondo-principal);
        color: var(--color-texto-secundario);
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
        color: var(--color-texto-principal);
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
        align-items: center;
        font-size: 0.85rem;
        margin-bottom: 1rem;
    }

    .stock-value {
        font-weight: 700;
        cursor: pointer;
    }

    .stock-edit-form {
        display: flex;
        gap: 0.2rem;
        align-items: center;
    }

    .stock-input {
        width: 50px;
        padding: 0.2rem;
        font-size: 0.85rem;
        text-align: center;
        border: 1px solid var(--color-texto-secundario);
        border-radius: 4px;
    }

    .btn-mini-save { background: var(--color-accion); color: white; border: none; padding: 0.2rem 0.4rem; cursor: pointer; border-radius: 4px; }
    .btn-mini-cancel { background: var(--color-texto-secundario); color: white; border: none; padding: 0.2rem 0.4rem; cursor: pointer; border-radius: 4px; }

    .warning { color: #f59e0b; }
    .danger { color: #ef4444; }

    .actions-group {
        display: flex;
        gap: 0.5rem;
    }

    .btn-comprar:disabled {
        background-color: var(--color-texto-secundario);
        opacity: 0.4;
        cursor: not-allowed;
    }

    .btn-eliminar {
        background: #fee2e2;
        border: 1px solid #fca5a5;
        padding: 0.5rem;
        border-radius: var(--radio-borde);
        cursor: pointer;
        transition: background 0.2s;
    }

    .btn-eliminar:hover {
        background: #fecaca;
    }
</style>