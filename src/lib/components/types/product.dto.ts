// src/lib/components/types/product.dto.ts

// Mapeo directo de ProductResponse.java
export interface ProductResponseDTO {
    id: number;
    sku: string;
    name: string;
    description: string;
    category: string;
    unitPrice: number;
    stock: number;
    active: boolean;
    createdAt: string; // OffsetDateTime se maneja como string ISO en TS
    updatedAt: string; // OffsetDateTime se maneja como string ISO en TS
}

// Mapeo directo de ProductRequest.java
export interface ProductRequestDTO {
    sku: string;
    name: string;
    description: string;
    category: string;
    unitPrice: number;
    stock: number;
}

// Como no vi la imagen de StockUpdateRequest.java, propongo esta estructura básica.
// (Si tu Java tiene campos diferentes, ¡avísame y lo ajustamos!)
export interface StockUpdateRequestDTO {
    quantity: number; 
}