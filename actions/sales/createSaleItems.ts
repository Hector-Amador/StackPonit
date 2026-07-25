"use server";

import { createClient } from "@/lib/supabase/server";

type CartItem = {
    product: {
        id: number;
        sale_price: number;
    };
    quantity: number;
};

type CreateSaleItemsProps = {
    saleId: number;
    cart: CartItem[];
};

export async function createSaleItems({
                                          saleId,
                                          cart,
                                      }: CreateSaleItemsProps) {
    const supabase = await createClient();

    const items = cart.map((item) => ({
        sale_id: saleId,
        product_id: item.product.id,
        quantity: item.quantity,
        unit_price: item.product.sale_price,
        subtotal: item.product.sale_price * item.quantity,
    }));

    const { error } = await supabase
        .from("sale_items")
        .insert(items);

    if (error) {
        throw error;
    }
}