"use client";
import Image from "next/image";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Category, Product } from "@/types/inventory";
import {CurrentUser} from "@/types/auth";
import { printTicket } from "@/lib/ticket";
import { Checkout } from "@/actions/sales/checkout";

type PaymentMethod = "cash" | "card" | "transfer";

type CartItem = {
    product: Product;
    quantity: number;
};

type MarketClientProps = {
    currentUser: CurrentUser;
    products: Product[];
    categories: Category[];
};

// const IVA_RATE = 0.16;
const paymentMethods: { id: PaymentMethod; label: string; icon: string }[] = [
    { id: "cash", label: "Efectivo", icon: "payments" },
    { id: "card", label: "Tarjeta", icon: "credit_card" },
    { id: "transfer", label: "Transferencia", icon: "account_balance" },
];

const money = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
});

function formatMoney(value: number) {
    return money.format(Number.isFinite(value) ? value : 0);
}

function getProductSubcategory(product: Product) {
    return Array.isArray(product.subcategories)
        ? product.subcategories[0]
        : product.subcategories;
}

export default function MarketClient({ products, categories, currentUser }: MarketClientProps) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [received, setReceived] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();
    const filteredProducts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return products.filter((product) => {
            const subcategory = getProductSubcategory(product);
            const matchesCategory = selectedCategoryId
                ? subcategory?.id === selectedCategoryId
                : true;
            const matchesQuery = normalizedQuery
                ? [product.name, product.barcode, product.sku]
                    .filter(Boolean)
                    .some((value) => value.toLowerCase().includes(normalizedQuery))
                : true;

            return product.is_active !== false && matchesCategory && matchesQuery;
        });
    }, [products, query, selectedCategoryId]);

    const subtotal = cart.reduce(
        (total, item) => total + item.product.sale_price * item.quantity,
        0
    );

    // const iva = subtotal * IVA_RATE;
    // const total = subtotal + iva;
    const total = subtotal;
    const receivedAmount = Number(received) || 0;
    const change = Math.max(receivedAmount - total, 0);
    const hasEnoughCash = paymentMethod !== "cash" || receivedAmount >= total;

    const addToCart = (product: Product) => {
        if (product.stock <= 0) {
            setMessage("Producto agotado.");
            return;
        }

        setMessage("");
        setCart((items) => {
            const existing = items.find((item) => item.product.id === product.id);

            if (existing) {
                if (existing.quantity >= product.stock) {
                    setMessage("No hay más existencias disponibles.");
                    return items;
                }

                return items.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...items, { product, quantity: 1 }];
        });
    };

    const changeQuantity = (productId: number, delta: number) => {
        setMessage("");
        setCart((items) =>
            items.flatMap((item) => {
                if (item.product.id !== productId) {
                    return [item];
                }

                const nextQuantity = item.quantity + delta;

                if (nextQuantity <= 0) {
                    return [];
                }

                if (nextQuantity > item.product.stock) {
                    setMessage("No hay más existencias disponibles.");
                    return [item];
                }

                return [{ ...item, quantity: nextQuantity }];
            })
        );
    };

    const clearSale = () => {
        setCart([]);
        setReceived("");
        setMessage("");
    };

    const checkout = () => {
        if (cart.length === 0) {
            setMessage("Agrega productos antes de cobrar.");
            return;
        }

        if (!hasEnoughCash) {
            setMessage("La cantidad recibida no cubre el total.");
            return;
        }

        startTransition(async () => {
            try {

                const sale = await Checkout({
                    cart,
                    sellerId: currentUser.id,
                    paymentMethod,
                    subtotal: total,
                    total,
                    receivedAmount,
                    changeAmount: change,
                });

                console.log(sale);

                printTicket({
                    cart,
                    total,
                    receivedAmount,
                    change,
                    paymentMethod,
                    seller: currentUser.full_name,
                });

                setMessage("Venta cobrada correctamente.");
                setCart([]);
                setReceived("");
                router.refresh();

            } catch (error) {
                console.error(error);
                setMessage("No se pudo cobrar la venta.");
            }
        });
    };

    const handleTicket = () => {
        if (cart.length === 0) {
            setMessage("Agrega productos antes de generar ticket.");
            return;
        }
        printTicket({
            cart,
            total,
            receivedAmount,
            change,
            paymentMethod,
            seller: currentUser.full_name,
        });

    };

    return (
        <main className="ml-20 flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 min-h-[calc(100vh-var(--spacing-touch-target,56px))]">
            <section className="md:col-span-6 border-r border-outline-variant flex flex-col bg-surface md:overflow-hidden">
                <div className="p-lg pb-md">
                    <div className="relative group">
                        <span
                            className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline"
                            data-icon="search"
                        >
                            search
                        </span>
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            className="w-full h-touch-target pl-12 pr-md bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-md text-body-md transition-all"
                            placeholder="Buscar Producto / Barcode / SKU..."
                            type="text"
                        />
                    </div>
                </div>

                <div className="px-lg pb-md">
                    <div className="flex gap-sm overflow-x-auto hide-scrollbar pb-xs">
                        <button
                            type="button"
                            onClick={() => setSelectedCategoryId(null)}
                            className={`px-md py-sm rounded-full font-label-sm text-label-sm whitespace-nowrap shadow-sm ${
                                selectedCategoryId === null
                                    ? "bg-primary text-on-primary"
                                    : "bg-surface-container-low border border-outline-variant text-on-surface-variant"
                            }`}
                        >
                            Todos
                        </button>
                        {categories.map((category) => (
                            <button
                                type="button"
                                key={category.id}
                                onClick={() => setSelectedCategoryId(category.id)}
                                className={`px-md py-sm rounded-full font-label-sm text-label-sm whitespace-nowrap shadow-sm ${
                                    selectedCategoryId === category.id
                                        ? "bg-primary text-on-primary"
                                        : "bg-surface-container-low border border-outline-variant text-on-surface-variant"
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 px-lg pb-lg grid grid-cols-2 md:grid-cols-3 gap-md overflow-y-auto">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => {
                            const subcategory = getProductSubcategory(product);
                            const imageSrc = product.image_url || "/images/product.svg";

                            return (
                                <button
                                    type="button"
                                    key={product.id}
                                    onClick={() => addToCart(product)}
                                    disabled={product.stock <= 0}
                                    className="text-left bg-surface-container-lowest border border-outline-variant rounded-xl p-sm flex flex-col group cursor-pointer transition-all hover:border-primary active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="w-full aspect-square bg-surface-container rounded-lg overflow-hidden mb-sm relative">
                                        <Image
                                            className="w-full h-full object-cover"
                                            width={200}
                                            height={200}
                                            alt={product.name}
                                            src={imageSrc}
                                            priority
                                        />
                                        <div className="absolute top-2 right-2 bg-primary/90 text-on-primary px-2 py-0.5 rounded-full font-mono-label text-[10px]">
                                            STOCK: {product.stock}
                                        </div>
                                    </div>
                                    <span className="font-label-sm text-label-sm text-on-surface-variant mb-xs">
                                        {subcategory?.name ?? "Sin categoría"}
                                    </span>
                                    <h3 className="font-headline-md text-[16px] leading-tight mb-xs">
                                        {product.name}
                                    </h3>
                                    <div className="mt-auto flex items-center justify-between gap-sm">
                                        <span className="font-headline-md text-primary">
                                            {formatMoney(product.sale_price)}
                                        </span>
                                        <span className="w-10 h-10 bg-primary text-on-primary rounded-lg flex items-center justify-center group-disabled:bg-outline">
                                            <span className="material-symbols-outlined text-[20px]" data-icon="add">
                                                add
                                            </span>
                                        </span>
                                    </div>
                                </button>
                            );
                        })
                    ) : (
                        <div className="col-span-full min-h-60 flex items-center justify-center text-on-surface-variant border border-dashed border-outline-variant rounded-xl">
                            Sin productos para esta búsqueda.
                        </div>
                    )}
                </div>
            </section>

            <section className="md:col-span-3 border-r border-outline-variant flex flex-col bg-surface-container-low shadow-inner">
                <div className="p-lg flex justify-between items-center bg-surface border-b border-outline-variant">
                    <h2 className="font-headline-md text-headline-md">Venta Actual</h2>
                    <button
                        type="button"
                        onClick={clearSale}
                        className="text-error flex items-center gap-xs font-label-sm disabled:opacity-40"
                        disabled={cart.length === 0}
                    >
                        <span className="material-symbols-outlined text-[20px]" data-icon="delete_sweep">
                            delete_sweep
                        </span>
                        Vaciar
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-md space-y-sm">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <div
                                key={item.product.id}
                                className="bg-surface p-md rounded-lg border border-outline-variant flex items-center gap-md"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="font-label-sm text-label-sm font-bold truncate">
                                        {item.product.name}
                                    </div>
                                    <div className="font-mono-label text-on-surface-variant text-[12px]">
                                        {formatMoney(item.product.sale_price)} c/u
                                    </div>
                                </div>
                                <div className="flex items-center gap-sm bg-surface-container rounded-lg p-xs">
                                    <button
                                        type="button"
                                        onClick={() => changeQuantity(item.product.id, -1)}
                                        className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-highest rounded"
                                    >
                                        <span className="material-symbols-outlined text-[18px]" data-icon="remove">
                                            remove
                                        </span>
                                    </button>
                                    <span className="font-headline-md text-[16px] w-6 text-center">
                                        {item.quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => changeQuantity(item.product.id, 1)}
                                        className="w-8 h-8 flex items-center justify-center hover:bg-surface-container-highest rounded"
                                    >
                                        <span className="material-symbols-outlined text-[18px]" data-icon="add">
                                            add
                                        </span>
                                    </button>
                                </div>
                                <div className="text-right w-20">
                                    <div className="font-headline-md text-[16px]">
                                        {formatMoney(item.product.sale_price * item.quantity)}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="h-full min-h-60 flex items-center justify-center text-center text-on-surface-variant border border-dashed border-outline-variant rounded-xl p-md">
                            Selecciona productos para iniciar la venta.
                        </div>
                    )}
                </div>

                <div className="p-lg bg-surface border-t border-outline-variant space-y-sm">
                    <div className="flex justify-between font-label-sm text-on-surface-variant">
                        <span>Subtotal</span>
                        <span>{formatMoney(subtotal)}</span>
                    </div>
                    {/*<div className="flex justify-between font-label-sm text-on-surface-variant">*/}
                    {/*    <span>IVA (16%)</span>*/}
                    {/*    <span>{formatMoney(iva)}</span>*/}
                    {/*</div>*/}
                    <div className="flex justify-between font-label-sm text-error">
                        <span>Descuentos</span>
                        <span>-{formatMoney(0)}</span>
                    </div>
                    <div className="pt-md border-t border-dashed border-outline-variant">
                        <div className="flex justify-between items-end gap-md">
                            <span className="font-headline-md text-on-surface-variant mb-1">TOTAL</span>
                            <span className="font-display-price text-display-price text-primary">
                                {formatMoney(total)}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="md:col-span-3 flex flex-col bg-surface md:overflow-hidden">
                <div className="p-lg border-b border-outline-variant">
                    <h2 className="font-headline-md text-headline-md">Pago</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-lg space-y-lg">
                    <div>
                        <label className="font-label-sm text-label-sm text-on-surface-variant mb-sm block">
                            Cantidad recibida
                        </label>
                        <div className="relative">
                            <span className="absolute left-md top-1/2 -translate-y-1/2 font-headline-lg text-on-surface-variant">
                                $
                            </span>
                            <input
                                value={received}
                                onChange={(event) => setReceived(event.target.value)}
                                className="w-full h-20 pl-10 pr-md bg-surface-container-low border-2 border-primary rounded-xl text-display-price font-display-price text-primary text-right focus:outline-none"
                                type="number"
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div className="bg-green-50 p-lg rounded-xl border border-green-100">
                        <div className="flex justify-between items-center gap-md">
                            <span className="font-label-sm text-green-700 font-bold uppercase tracking-widest">
                                Cambio
                            </span>
                            <span className="font-display-price text-[40px] text-green-600">
                                {formatMoney(change)}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-md">
                        {paymentMethods.map((method) => {
                            const isSelected = paymentMethod === method.id;

                            return (
                                <button
                                    key={method.id}
                                    type="button"
                                    onClick={() => setPaymentMethod(method.id)}
                                    className={`flex flex-col items-center justify-center gap-sm p-lg rounded-xl transition-all active:scale-95 ${
                                        isSelected
                                            ? "bg-primary-container text-on-primary shadow-md"
                                            : "border border-outline-variant hover:bg-surface-container-low"
                                    }`}
                                >
                                    <span
                                        className={`material-symbols-outlined text-[32px] ${
                                            isSelected ? "" : "text-primary"
                                        }`}
                                        data-icon={method.icon}
                                    >
                                        {method.icon}
                                    </span>
                                    <span
                                        className={`font-label-sm font-bold ${
                                            isSelected ? "" : "text-on-surface-variant"
                                        }`}
                                    >
                                        {method.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {message ? (
                        <p className="rounded-lg border border-outline-variant bg-surface-container-low p-md text-label-sm text-on-surface-variant">
                            {message}
                        </p>
                    ) : null}

                    <div className="space-y-md pt-lg">
                        <button
                            type="button"
                            onClick={checkout}
                            disabled={isPending || cart.length === 0 || !hasEnoughCash}
                            className="w-full h-20 bg-green-600 text-on-primary rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-md hover:bg-green-700 shadow-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span
                                className="material-symbols-outlined text-[28px]"
                                data-icon="shopping_cart_checkout"
                            >
                                shopping_cart_checkout
                            </span>
                            {isPending ? "Cobrando..." : "Cobrar"}
                        </button>
                        <button
                            type="button"
                            onClick={handleTicket}
                            disabled={cart.length === 0}
                            className="w-full h-touch-target p-2 bg-primary text-on-primary rounded-xl font-label-sm text-label-sm flex items-center justify-center gap-md hover:bg-primary-container transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined" data-icon="receipt_long">
                                receipt_long
                            </span>
                            Generar Ticket
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
