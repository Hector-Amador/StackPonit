import Menu from "@/components/Menu";
import Header from "@/components/Header";
import {getCurrentUser} from "@/lib/auth/get_curret_user";
import {redirect} from "next/navigation";
import {getDashboardStats, getTopProducts, getSalesTrend, getRecentSales, getLowStockProducts} from "@/actions/dashboard/dashboard";

export default async function Dashboard() {
    const currentUser = await getCurrentUser();
    const stats = await getDashboardStats();
    const topProducts = await getTopProducts();
    const salesTrend = await getSalesTrend();
    const recentSales = await getRecentSales();
    const lowStockProducts = await getLowStockProducts();
    const max = Math.max(...salesTrend.map((d) => d.total));

    if (!currentUser?.isAdmin) {
        redirect("/market");
    }

    return (
        <main className="font-body-md text-body-md overflow-hidden">
            <Header/>
            <Menu currentUser={currentUser}/>
            <main className="ml-20 p-lg h-[calc(100vh-64px)] overflow-y-auto bg-background">
                <div className="max-w-7xl mx-auto space-y-lg">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div>
                            <h2 className="font-headline-lg text-headline-lg text-on-surface">Panel de Control de la
                                Tienda</h2>
                            <p className="text-on-surface-variant font-body-md">Hola, {currentUser?.full_name}. Esto es
                                lo que está
                                sucediendo hoy en la Tienda Principal.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
                        <div
                            className="bento-card p-md rounded-xl bg-surface-container-lowest border border-outline-variant shadow-sm">
                            <div className="flex justify-between items-start mb-sm">
                                <div className="p-xs bg-primary/10 rounded-lg">
                                    <span className="material-symbols-outlined text-secondary">calendar_month</span>
                                </div>
                                <span
                                    className="text-on-tertiary-container font-label-sm bg-tertiary-fixed px-sm py-base rounded-full">+12.5%</span>
                            </div>
                            <p className="text-on-surface-variant font-label-md">Ventas de Hoy</p>
                            <h3 className="font-display-lg text-headline-lg text-on-surface mt-xs">{stats.month.sales} ventas</h3>
                            <div className="w-full h-1 bg-surface-container mt-md rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[75%]"></div>
                            </div>
                            <p className="font-label-sm text-on-surface-variant mt-sm">75% del objetivo diario
                                alcanzado</p>
                        </div>
                        <div
                            className="bento-card p-md rounded-xl bg-surface-container-lowest border border-outline-variant shadow-sm">
                            <div className="flex justify-between items-start mb-sm">
                                <div className="p-xs bg-secondary-container/30 rounded-lg">
                                    <span className="material-symbols-outlined text-secondary">calendar_month</span>
                                </div>
                                <span
                                    className="text-on-tertiary-container font-label-sm bg-tertiary-fixed px-sm py-base rounded-full">+8.2%</span>
                            </div>
                            <p className="text-on-surface-variant font-label-md">Ventas del Mes</p>
                            <h3 className="font-display-lg text-headline-lg text-on-surface mt-xs">{stats.month.sales} ventas</h3>
                            <div className="flex items-center gap-xs mt-md">
                                <span className="material-symbols-outlined text-outline text-[18px]">trending_up</span>
                                <p className="font-label-sm text-on-surface-variant">En camino al objetivo de $150k</p>
                            </div>
                        </div>
                        <div
                            className="bento-card p-md rounded-xl bg-surface-container-lowest border border-outline-variant shadow-sm">
                            <div className="flex justify-between items-start mb-sm">
                                <div className="p-xs bg-primary/10 rounded-lg">
                                    <span className="material-symbols-outlined text-primary">payments</span>
                                </div>
                                <span
                                    className="text-on-tertiary-container font-label-sm bg-tertiary-fixed px-sm py-base rounded-full">+12.5%</span>
                            </div>
                            <p className="text-on-surface-variant font-label-md">Ganacias de Hoy</p>
                            <h3 className="font-display-lg text-headline-lg text-on-surface mt-xs">$ {stats.today.amount}</h3>
                            <div className="w-full h-1 bg-surface-container mt-md rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[75%]"></div>
                            </div>
                            <p className="font-label-sm text-on-surface-variant mt-sm">75% del objetivo diario
                                alcanzado</p>
                        </div>
                        <div
                            className="bento-card p-md rounded-xl bg-surface-container-lowest border border-outline-variant shadow-sm">
                            <div className="flex justify-between items-start mb-sm">
                                <div className="p-xs bg-secondary-container/30 rounded-lg">
                                    <span className="material-symbols-outlined text-primary">payments</span>
                                </div>
                                <span
                                    className="text-on-tertiary-container font-label-sm bg-tertiary-fixed px-sm py-base rounded-full">+8.2%</span>
                            </div>
                            <p className="text-on-surface-variant font-label-md">Ganacias de este Mes</p>
                            <h3 className="font-display-lg text-headline-lg text-on-surface mt-xs">$ {stats.month.amount}</h3>
                            <div className="flex items-center gap-xs mt-md">
                                <span className="material-symbols-outlined text-outline text-[18px]">trending_up</span>
                                <p className="font-label-sm text-on-surface-variant">En camino al objetivo de $150k</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
                        <div
                            className="lg:col-span-2 bento-card rounded-xl p-lg bg-surface-container-lowest border border-outline-variant shadow-sm">
                            <div className="flex justify-between items-center mb-lg">
                                <h4 className="font-headline-md text-on-surface">Tendencias de Ventas</h4>
                                {/*<div className="flex gap-sm">*/}
                                {/*    <select*/}
                                {/*        className="bg-surface-container-low border-none rounded-lg font-label-sm text-on-surface-variant focus:ring-primary/20 px-md py-sm">*/}
                                {/*        <option>Últimos 7 días</option>*/}
                                {/*        <option>Últimos 30 días</option>*/}
                                {/*    </select>*/}
                                {/*</div>*/}
                                <p>Últimos 7 días</p>
                            </div>
                            <div className="relative h-64">
                                <div className="absolute inset-0 flex items-end gap-2">
                                    {salesTrend.map((day) => (
                                        <div
                                            key={day.label}
                                            className="flex flex-col justify-end items-center flex-1 h-full"
                                        >
                                            <div
                                                className={`w-full rounded-t-lg transition-all group relative ${
                                                    day.total === max
                                                        ? "bg-primary"
                                                        : "bg-primary/20 hover:bg-primary/40"
                                                }`}
                                                style={{
                                                    height: `${Math.max(
                                                        (day.total / max) * 100,
                                                        day.total > 0 ? 8 : 0
                                                    )}%`,
                                                }}
                                            >
                    <span
                        className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-on-surface text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                        {day.total.toLocaleString("es-MX", {
                            style: "currency",
                            currency: "MXN",
                        })}
                    </span>
                                            </div>

                                            <span className="mt-3 text-sm text-on-surface-variant">
                    {day.label}
                </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div
                            className="bento-card rounded-xl p-lg bg-surface-container-lowest border border-outline-variant shadow-sm">
                            <h4 className="font-headline-md text-on-surface mb-lg">Más Vendidos</h4>
                            <div className="space-y-md">
                                {topProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center gap-md p-sm hover:bg-surface-container-low rounded-lg transition-all"
                                    >
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />

                                        <div className="flex-1">
                                            <p className="font-label-md font-bold">
                                                {product.name}
                                            </p>

                                            <p className="font-label-sm text-on-surface-variant">
                                                {product.totalSold}{" "}
                                                {product.totalSold === 1
                                                    ? "Unidad Vendida"
                                                    : "Unidades Vendidas"}
                                            </p>
                                        </div>

                                        <p className="font-numeric-data text-primary">
                                            {Number(product.sale_price).toLocaleString("es-MX", {
                                                style: "currency",
                                                currency: "MXN",
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg pb-xl">
                        <div className="bento-card rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant shadow-sm">
                            <div
                                className="p-lg flex justify-between items-center border-b border-outline-variant bg-surface-container-lowest">
                                <h4 className="font-headline-md text-on-surface">Ventas Recientes</h4>
                                <button className="text-primary font-label-sm hover:underline">Ver Todo</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                    <tr className="bg-surface-container-low text-on-surface-variant font-label-sm">
                                        <th className="px-lg py-md">ID de Pedido</th>
                                        <th className="px-lg py-md">Cliente</th>
                                        <th className="px-lg py-md">Monto</th>
                                        <th className="px-lg py-md">Estado</th>
                                    </tr>
                                    </thead>
                                    <tbody className="font-label-md">
                                    {recentSales.map((sale) => (
                                        <tr
                                            key={sale.id}
                                            className="border-b border-outline-variant hover:bg-primary/5 transition-all cursor-pointer"
                                        >
                                            <td className="px-lg py-md font-bold">
                                                #{sale.folio}
                                            </td>

                                            <td className="px-lg py-md">
                                                {sale.seller}
                                            </td>

                                            <td className="px-lg py-md">
                                                {sale.total.toLocaleString("es-MX", {
                                                    style: "currency",
                                                    currency: "MXN",
                                                })}
                                            </td>

                                            <td className="px-lg py-md">
                                            <span
                                                className="px-sm py-base bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-[10px] font-bold">
                                                {sale.status}
                                            </span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="bento-card rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant shadow-sm">
                            <div
                                className="p-lg flex justify-between items-center border-b border-outline-variant bg-surface-container-lowest">
                                <div className="flex items-center gap-sm">
                                    <span className="material-symbols-outlined text-error">inventory</span>
                                    <h4 className="font-headline-md text-on-surface">Alerta de Stock Bajo</h4>
                                </div>
                                <p>Productos que tienen menos de 10 en stock</p>
                            </div>
                            <div className="p-lg space-y-md">
                                {lowStockProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className={`flex items-center justify-between p-md rounded-xl ${
                                            product.stock === 0
                                                ? "bg-error-container/20 border border-error/20"
                                                : "bg-surface-container-low"
                                        }`}
                                    >
                                        <div className="flex items-center gap-md">
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />

                                            <div>
                                                <p className="font-label-md font-bold">
                                                    {product.name}
                                                </p>

                                                <p
                                                    className={`font-label-sm ${
                                                        product.stock === 0
                                                            ? "text-error font-bold"
                                                            : "text-on-surface-variant"
                                                    }`}
                                                >
                                                    Quedan {product.stock} en stock
                                                    {/*(Umbral: {product.min_stock})*/}
                                                </p>
                                            </div>
                                        </div>

                                        {/*<button className="text-primary font-bold hover:bg-primary/5 p-sm rounded-lg">*/}
                                        {/*    Pedir*/}
                                        {/*</button>*/}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/*<div className="fixed top-lg right-lg z-100 transform translate-x-[150%] transition-transform duration-500 ease-in-out"  id="toast">*/}
            {/*    <div*/}
            {/*        className="bg-surface-container-lowest border border-outline-variant shadow-xl rounded-xl p-md flex items-center gap-md min-w-80">*/}
            {/*        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">*/}
            {/*            <span className="material-symbols-outlined text-primary">check_circle</span>*/}
            {/*        </div>*/}
            {/*        <div className="flex-1">*/}
            {/*            <p className="font-label-md font-bold text-on-surface">Inventario Actualizado</p>*/}
            {/*            <p className="font-label-sm text-on-surface-variant">Sincronización exitosa de 124*/}
            {/*                productos.</p>*/}
            {/*        </div>*/}
            {/*        <button className="p-xs text-on-surface-variant hover:bg-surface-container rounded-lg">*/}
            {/*            <span className="material-symbols-outlined">close</span>*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </main>
    )
}