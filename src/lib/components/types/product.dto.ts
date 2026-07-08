// src/lib/components/types/product.dto.ts

export interface ProductResponseDTO {
    id: number;
    sku: string;
    name: string;
    description: string;
    category: string;
    unitPrice: number;
    stock: number;
    active: boolean;
    createdAt: string; 
    updatedAt: string; 
}

export interface ProductRequestDTO {
    sku: string;
    name: string;
    description: string;
    category: string;
    unitPrice: number;
    stock: number;
}

export interface StockUpdateRequestDTO {
    stock: number; 
}