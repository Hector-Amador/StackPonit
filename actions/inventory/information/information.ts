import { supabaseAdmin } from "@/lib/supabase/supabase-admin";

export async function getInventoryStats() {
    const { data, error } = await supabaseAdmin
        .from("products")
        .select(`
            id,
            sku,
            stock,
            sale_price,
            min_stock
        `);

    if (error) {
        throw error;
    }

    const totalSkus = data.length;

    const totalInventoryValue = data.reduce(
        (sum, product) => sum + product.sale_price,
        0
    );

    const lowStockProducts = data.filter(
        (product) =>
            product.stock > 0 &&
            product.stock <= product.min_stock
    ).length;

    const outOfStockProducts = data.filter(
        product => Number(product.stock) === 0
    ).length;

    return {
        totalSkus,
        totalInventoryValue,
        lowStockProducts,
        outOfStockProducts,
    };
}