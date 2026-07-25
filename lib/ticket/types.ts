export interface TicketProduct {
    product: {
        id: number;
        name: string;
        sku: string;
        sale_price: number;
        image_url: string | null;
    };
    quantity: number;
}

export interface TicketData {
    cart: TicketProduct[];
    total: number;
    receivedAmount: number;
    change: number;
    paymentMethod: string;
    seller: string;
}