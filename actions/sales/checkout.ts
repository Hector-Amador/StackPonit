"use server";
import { createSale } from "./createSale";
import { createSaleItems } from "./createSaleItems";
import { updateStock } from "./updateStock";

type CartItem = {
    product: {
        id: number;
        stock: number;
        sale_price: number;
    };
    quantity: number;
};

type CheckoutProps = {
    cart: CartItem[];

    sellerId: string;

    paymentMethod: string;

    subtotal: number;

    total: number;

    receivedAmount: number;

    changeAmount: number;
};

export async function Checkout({
       cart,
       sellerId,
       paymentMethod,
       subtotal,
       total,
       receivedAmount,
       changeAmount,
   }: CheckoutProps) {

    const folio = `VTA-${Date.now()}`;

    const sale = await createSale({
        folio,
        sellerId,
        paymentMethod,
        subtotal,
        total,
        receivedAmount,
        changeAmount,
    });

    await createSaleItems({
        saleId: sale.id,
        cart,
    });

    await updateStock(cart);

    return sale;
}