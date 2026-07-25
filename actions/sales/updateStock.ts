"use server";

import { updateProduct } from "@/actions/products";

type CartItem = {
    product: {
        id: number;
        stock: number;
    };
    quantity: number;
};

export async function updateStock(cart: CartItem[]) {
    await Promise.all(
        cart.map((item) =>
            updateProduct({
                id: item.product.id,
                stock: item.product.stock - item.quantity,
            })
        )
    );
}