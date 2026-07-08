// src/lib/components/services/product.service.ts
import { api } from './api.client';
import type { ProductResponseDTO, ProductRequestDTO, StockUpdateRequestDTO } from '../types/product.dto';

class ProductService {
    /**
     * GET /{tenant}/api/products
     * Lista todos los productos bajo el tenant actualmente autenticado
     */
    async findAll(): Promise<ProductResponseDTO[]> {
        // api.client añade automáticamente el prefijo '/{tenant}/api'
        const response = await api.get<ProductResponseDTO[]>('/products');

        if (response.error || !response.data) {
            throw new Error(response.message || 'Error al obtener el catálogo de productos');
        }
        return response.data;
    }

    /**
     * GET /{tenant}/api/products/{id}
     * Busca un producto en el inventario usando su ID único
     */
    async findById(id: number): Promise<ProductResponseDTO> {
        const response = await api.get<ProductResponseDTO>(`/products/${id}`);

        if (response.error || !response.data) {
            throw new Error(response.message || `Error al obtener el producto con ID: ${id}`);
        }
        return response.data;
    }

    /**
     * POST /{tenant}/api/products
     * Registra un nuevo artículo en el catálogo logístico
     */
    async create(productData: ProductRequestDTO): Promise<ProductResponseDTO> {
        const response = await api.post<ProductResponseDTO>('/products', productData);

        if (response.error || !response.data) {
            throw new Error(response.message || 'Error al crear el producto');
        }
        return response.data;
    }

    /**
     * PUT /{tenant}/api/products/{id}
     * Actualiza por completo un producto existente
     */
    async update(id: number, productData: ProductRequestDTO): Promise<ProductResponseDTO> {
        const response = await api.put<ProductResponseDTO>(`/products/${id}`, productData);

        if (response.error || !response.data) {
            throw new Error(response.message || `Error al actualizar el producto con ID: ${id}`);
        }
        return response.data;
    }

    /**
     * PATCH /{tenant}/api/products/{id}/stock
     * Modificación parcial: actualiza únicamente el stock en bodega
     */
    async updateStock(id: number, stockData: StockUpdateRequestDTO): Promise<ProductResponseDTO> {
        const response = await api.patch<ProductResponseDTO>(`/products/${id}/stock`, stockData);

        if (response.error || !response.data) {
            throw new Error(response.message || `Error al modificar el stock del producto con ID: ${id}`);
        }
        return response.data;
    }

    /**
     * DELETE /{tenant}/api/products/{id}
     * Remueve físicamente un artículo del inventario del BFF
     */
    async delete(id: number): Promise<boolean> {
        const response = await api.delete<void>(`/products/${id}`);

        if (response.error) {
            throw new Error(response.message || `Error al eliminar el producto con ID: ${id}`);
        }
        return true;
    }
}

// Exportamos una instancia única (Singleton) para mantener coherencia en toda la aplicación
export const productService = new ProductService();