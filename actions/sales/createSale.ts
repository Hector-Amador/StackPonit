"use server";

import {createClient} from "@/lib/supabase/server";

export type CreateSaleProps = {
    sellerId: string;
    folio: string;
    paymentMethod: string;
    subtotal: number;
    total: number;
    receivedAmount: number;
    changeAmount: number;
};

export async function createSale({

                                     sellerId,
                                     folio,
                                     paymentMethod,
                                     subtotal,
                                     total,
                                     receivedAmount,
                                     changeAmount,
                                 }: CreateSaleProps) {

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("sales")
        .insert({
            seller_id: sellerId,
            payment_method: paymentMethod,
            subtotal,
            folio,
            total,
            received_amount: receivedAmount,
            change_amount: changeAmount,
        })
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}