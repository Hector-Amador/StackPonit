"use server";
import {supabaseAdmin} from "@/lib/supabase/supabase-admin";
import type {Product} from "@/types/inventory";

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabaseAdmin
        .from("products")
        .select(`
            id,
            name,
            sku,
            barcode,
            sale_price,
            stock,
            cost_price,
            description,
            image_url,
            min_stock,
            is_active,
            created_at,
            updated_at,
            brands (
                    id,
                    name
                    ),
            subcategories (
                id,
                name,
                categories (
                    id,
                    name
                )
                
            )
        `);

    if (error) {
        throw error;
    }

    return (data ?? []) as unknown as Product[];
}

export async function createProduct(product: {
    barcode?: string;
    sku?: string;
    name: string;
    description?: string;
    brand_id?: number | null;
    subcategory_id: number;
    cost_price: number;
    sale_price: number;
    stock: number;
    min_stock: number;
    image_url?: string ;
    is_active?: boolean;
}) {
    const { data, error } = await supabaseAdmin
        .from("products")
        .insert({
            barcode: product.barcode,
            sku: product.sku,
            name: product.name,
            description: product.description,
            brand_id: product.brand_id,
            subcategory_id: product.subcategory_id,
            cost_price: product.cost_price,
            sale_price: product.sale_price,
            stock: product.stock,
            min_stock: product.min_stock,
            image_url: product.image_url,
            is_active: product.is_active ?? true,
        })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}

interface UpdateProductProps {
    id: number;
    barcode?: string;
    sku?: string;
    name?: string;
    description?: string;
    brand_id?: number | null;
    subcategory_id?: number;
    cost_price?: number;
    sale_price?: number;
    stock?: number;
    min_stock?: number;
    image_url?: string;
    is_active?: boolean;
}

export async function updateProduct(product: UpdateProductProps) {
    const { id, ...updateData } = product;

    const { data, error } = await supabaseAdmin
        .from("products")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Error updating product:", error);
        throw new Error(error.message);
    }

    return data;
}