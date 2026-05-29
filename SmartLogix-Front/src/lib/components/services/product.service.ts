// src/lib/services/product.service.ts
import type { ProductResponseDTO, ProductRequestDTO, StockUpdateRequestDTO } from '$lib/components/types/product.dto';

const API_URL = 'http://localhost:8080/api/products';

// Función auxiliar para obtener los headers con el JWT automáticamente
function getHeaders(): HeadersInit {
    // Buscamos el token guardado en el navegador (ajusta la clave 'token' si usas otra)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
}

export const productService = {
    // GET /api/products
    async findAll(): Promise<ProductResponseDTO[]> {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: getHeaders()
        });

        if (!response.ok) {
            throw new Error('Error al obtener el catálogo de productos');
        }
        return await response.json();
    },

    // GET /api/products/{id}
    async findById(id: number): Promise<ProductResponseDTO> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: getHeaders()
        });

        if (!response.ok) {
            throw new Error(`Error al obtener el producto con ID: ${id}`);
        }
        return await response.json();
    },

    // POST /api/products
    async create(productData: ProductRequestDTO): Promise<ProductResponseDTO> {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error('Error al crear el producto');
        }
        return await response.json();
    },

    // PUT /api/products/{id}
    async update(id: number, productData: ProductRequestDTO): Promise<ProductResponseDTO> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar el producto con ID: ${id}`);
        }
        return await response.json();
    },

    // PATCH /api/products/{id}/stock
    async updateStock(id: number, stockData: StockUpdateRequestDTO): Promise<ProductResponseDTO> {
        const response = await fetch(`${API_URL}/${id}/stock`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(stockData)
        });

        if (!response.ok) {
            throw new Error(`Error al modificar el stock del producto con ID: ${id}`);
        }
        return await response.json();
    },

    // DELETE /api/products/{id}
    async delete(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el producto con ID: ${id}`);
        }
    }
};