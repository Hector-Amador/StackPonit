"use server";

import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
    const supabase = await createClient();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayMonth = new Date();
    firstDayMonth.setDate(1);
    firstDayMonth.setHours(0, 0, 0, 0);

    const [todayResult, monthResult] = await Promise.all([
        supabase
            .from("sales")
            .select("total")
            .gte("created_at", today.toISOString()),

        supabase
            .from("sales")
            .select("total")
            .gte("created_at", firstDayMonth.toISOString()),
    ]);

    if (todayResult.error) throw todayResult.error;
    if (monthResult.error) throw monthResult.error;

    return {
        today: {
            amount: todayResult.data.reduce(
                (sum, sale) => sum + Number(sale.total),
                0
            ),
            sales: todayResult.data.length,
        },

        month: {
            amount: monthResult.data.reduce(
                (sum, sale) => sum + Number(sale.total),
                0
            ),
            sales: monthResult.data.length,
        },
    };
}

export async function getTopProducts() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("sale_items")
        .select(`
            product_id,
            quantity,
            products (
                id,
                name,
                image_url,
                sale_price
            )
        `);

    if (error) throw error;

    const grouped = data.reduce((acc, item) => {
        const product = item.products as any;

        if (!product) return acc;

        if (!acc[item.product_id]) {
            acc[item.product_id] = {
                ...product,
                totalSold: 0,
            };
        }

        acc[item.product_id].totalSold += item.quantity;

        return acc;
    }, {} as Record<number, any>);

    return Object.values(grouped)
        .sort((a: any, b: any) => b.totalSold - a.totalSold)
        .slice(0, 4);
}

export async function getSalesTrend(days: 7 | 30 = 7) {
    const supabase = await createClient();

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - (days - 1));

    const { data, error } = await supabase
        .from("sales")
        .select("created_at,total")
        .gte("created_at", start.toISOString())
        .order("created_at");

    if (error) throw error;

    const labels =
        days === 7
            ? ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
            : [];

    const grouped = new Map<string, number>();

    data.forEach((sale) => {
        const date = new Date(sale.created_at);

        const key =
            days === 7
                ? labels[date.getDay()]
                : date.toISOString().split("T")[0];

        grouped.set(key, (grouped.get(key) ?? 0) + Number(sale.total));
    });

    if (days === 7) {
        const today = new Date();

        const result = [];

        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);

            const day = labels[d.getDay()];

            result.push({
                label: day,
                total: grouped.get(day) ?? 0,
            });
        }

        return result;
    }

    return [...grouped.entries()].map(([label, total]) => ({
        label,
        total,
    }));
}

export async function getRecentSales(limit = 4) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("sales")
        .select(`
            id,
            folio,
            total,
            payment_method,
            created_at,
            profiles (
                full_name
            )
        `)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) throw error;

    return data.map((sale) => ({
        id: sale.id,
        folio: sale.folio,
        seller: (sale.profiles as any)?.full_name ?? "Sin vendedor",
        total: Number(sale.total),
        paymentMethod: sale.payment_method,
        createdAt: sale.created_at,
        status: "COMPLETADO",
    }));
}

export async function getLowStockProducts(limit = 5) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("products")
        .select(`
            id,
            name,
            stock,
            image_url
        `)
        .lt("stock", 10)
        .eq("is_active", true)
        .order("stock", { ascending: true })
        .limit(limit);

    if (error) throw error;

    return data;
}