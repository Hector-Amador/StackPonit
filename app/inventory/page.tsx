import Image from "next/image";
import {getCurrentUser} from "@/lib/auth/get_curret_user";
import {redirect} from "next/navigation";
import {getProducts} from "@/actions/products";
import {getLoadData} from "@/actions/inventory/loadData";
import { getInventoryStats } from "@/actions/inventory/information/information";
import Menu from "@/components/Menu";
import Header from "@/components/Header";
import ButtonAddProduct from "@/components/inventory/ButtonAddProduct";
import ButtonEditProduct from "@/components/inventory/ButtonEditProduct";
import ButtonAddCategory from "@/components/inventory/ButtonAddCategory";
import ButtonAddBrand from "@/components/inventory/ButtonAddBrand";
import ButtonAddSubCategory from "@/components/inventory/ButtonAddSubCategory";

export default async function Inventory() {
    const products = await getProducts();
    const currentUser = await getCurrentUser();
    const statusInventory = await getInventoryStats();
    const { brands, categories, subCategories } = await getLoadData();
    if (!currentUser?.isAdmin) {
        redirect("/market");
    }
    return (
        <main className="bg-background text-on-surface">
            <Header/>
            <Menu currentUser={currentUser}/>
            <main className="ml-20 pt-7 p-lg min-h-screen">
                <div className="flex flex-col md:flex-row gap-1 items-center justify-between mb-lg">
                    <div>
                        <h3 className="font-headline-lg text-headline-lg text-on-surface">Gestión de Inventario</h3>
                        <p className="text-on-surface-variant font-body-md text-body-md">Supervise los niveles de
                            existencias y las operaciones del almacén en todas las ubicaciones.</p>
                    </div>
                    {/*<div className="flex gap-sm">*/}
                    {/*    <button*/}
                    {/*        className="bg-surface-container-low text-on-surface px-md py-sm rounded-lg font-label-md text-label-md border border-outline-variant hover:bg-surface-container flex items-center gap-xs">*/}
                    {/*        <span className="material-symbols-outlined text-[20px]">file_download</span> Exportar*/}
                    {/*        Informe*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    <div className="grid grid-cols-2 lg:flex lg:flex-row gap-sm mt-md">
                        <ButtonAddBrand/>
                        <ButtonAddCategory/>
                        <ButtonAddSubCategory categories={categories} />
                        <ButtonAddProduct brands={brands} categories={categories} subCategories={subCategories}/>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-gutter mb-lg">
                    <div
                        className="col-span-12 md:col-span-3 bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
                        <div className="flex justify-between items-start mb-sm">
                        <span
                            className="material-symbols-outlined bg-primary/10 text-primary p-sm rounded-lg">inventory</span>
                        </div>
                        <p className="text-on-surface-variant font-label-md text-label-md">Total de SKUs</p>
                        <h4 className="font-display-lg text-[32px] text-on-surface font-bold">{statusInventory.totalSkus}</h4>
                        <p className="text-primary text-label-sm font-label-sm mt-xs flex items-center gap-xs">
                            Total de productos en inventario
                        </p>
                    </div>
                    <div
                        className="col-span-12 md:col-span-3 bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm">
                        <div className="flex justify-between items-start mb-sm">
                        <span
                            className="material-symbols-outlined bg-secondary-container text-on-secondary-container p-sm rounded-lg">currency_exchange</span>
                        </div>
                        <p className="text-on-surface-variant font-label-md text-label-md">Valor del Inventario</p>
                        <h4 className="font-display-lg text-[32px] text-on-surface font-bold">$ {statusInventory.totalInventoryValue}</h4>
                        <p className="text-on-surface-variant font-label-sm text-label-sm mt-xs">Valoración de activos
                            estable</p>
                    </div>
                    <div
                        className="col-span-12 md:col-span-3 bg-[#fffa0042] p-md rounded-xl border border-error/10 shadow-sm">
                        <div className="flex justify-between items-start mb-sm">
                        <span
                            className="material-symbols-outlined bg-[#dbd70091] text-[#989726] p-sm rounded-lg">warning</span>
                            <span className="text-[#636218] font-label-sm text-label-sm">Cuídado</span>
                        </div>
                        <p className="text-[#636218] font-label-md text-label-md">Artículos con poco Stock</p>
                        <h4 className="font-display-lg text-[32px] text-[#989726] font-bold">{statusInventory.lowStockProducts}</h4>
                        <p className="text-[#989726] font-label-sm text-label-sm mt-xs">Acción de alerta</p>
                    </div>
                    <div
                        className="col-span-12 md:col-span-3 bg-error-container p-md rounded-xl border border-error/10 shadow-sm">
                        <div className="flex justify-between items-start mb-sm">
                        <span
                            className="material-symbols-outlined bg-error/20 text-error p-sm rounded-lg">warning</span>
                            <span className="text-on-error-container font-label-sm text-label-sm">Urgente</span>
                        </div>
                        <p className="text-on-error-container font-label-md text-label-md">Productos agotados</p>
                        <h4 className="font-display-lg text-[32px] text-error font-bold">{statusInventory.outOfStockProducts}</h4>
                        <p className="text-error font-label-sm text-label-sm mt-xs">Acción requerida de inmediato</p>
                    </div>

                </div>
                <div className="grid grid-cols-1 gap-gutter">
                {/*<div className="grid grid-cols-12 gap-gutter">*/}
                    <div
                        className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
                        <div className="p-md border-b border-outline-variant flex items-center justify-between">
                            <h5 className="font-headline-md text-headline-md text-on-surface">Stock de
                                Productos</h5>
                            <div className="flex gap-xs">
                                {/*<button className="p-xs hover:bg-surface-container rounded-lg transition-colors"><span*/}
                                {/*    className="material-symbols-outlined">filter_list</span>*/}
                                {/*</button>*/}
                                {/*<button className="p-xs hover:bg-surface-container rounded-lg transition-colors"><span*/}
                                {/*    className="material-symbols-outlined">more_vert</span>*/}
                                {/*</button>*/}
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-surface-container-low border-b border-outline-variant">
                                <tr>
                                    <th className="px-md py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Información
                                        del Producto
                                    </th>
                                    <th className="px-md py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">SKU</th>
                                    <th className="px-md py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Precio</th>
                                    <th className="px-md py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Existencias</th>
                                    <th className="px-md py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Estado</th>
                                    <th className="px-md py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider"></th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant">
                                {products.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-primary/5 transition-colors cursor-pointer"
                                    >
                                        <td className="px-md py-md">
                                            <div className="flex items-center gap-md">
                                                <div
                                                    className="w-10 h-10 rounded-lg bg-surface-container overflow-hidden">
                                                    <Image
                                                        width={100}
                                                        height={100}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                        src={product.image_url || "/images/product.svg"}
                                                    />
                                                </div>

                                                <div>
                                                    <p className="font-label-md text-label-md text-on-surface">
                                                        {product.name}
                                                    </p>

                                                    <p className="text-label-sm text-on-surface-variant">
                                                        Producto | {product.barcode}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-md py-md font-numeric-data text-label-md text-on-surface-variant">
                                            {product.sku}
                                        </td>

                                        <td className="px-md py-md font-label-md text-label-md text-on-surface-variant">
                                            ${product.sale_price}
                                        </td>

                                        <td className="px-md py-md">
                                            <p className="font-numeric-data text-label-md text-on-surface">
                                                {product.stock}
                                            </p>

                                            <div
                                                className="w-24 h-1.5 bg-surface-container rounded-full mt-xs overflow-hidden">
                                                <div
                                                    className={`h-full ${
                                                        product.stock > 20
                                                            ? "bg-secondary"
                                                            : product.stock > 10
                                                                ? "bg-yellow-500"
                                                                : "bg-red-500"
                                                    }`}
                                                    style={{
                                                        width: `${Math.min(product.stock, 100)}%`,
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-md py-md">
                                        <span
                                            className={`inline-flex items-center px-sm py-xs rounded-full text-[10px] font-bold uppercase ${
                                                product.stock > 20
                                                    ? "bg-green-100 text-green-700"
                                                    : product.stock > 10
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {product.stock > 20
                                                ? "Disponible"
                                                : product.stock > 10
                                                    ? "Advertencia"
                                                    : "Agotado"}
                                        </span>
                                        </td>
                                        <td className="px-md py-md text-right">
                                            <ButtonEditProduct brands={brands} categories={categories}
                                                               subCategories={subCategories} product={product}/>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        {/*<div*/}
                        {/*    className="mt-auto border-t border-outline-variant p-md bg-surface-container-low flex items-center justify-between">*/}
                        {/*    <p className="text-on-surface-variant font-label-sm text-label-sm">Mostrando 1-10 de 12,482*/}
                        {/*        entradas de SKU</p>*/}
                        {/*    <div className="flex gap-xs">*/}
                        {/*        <button*/}
                        {/*            className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant bg-surface-container-lowest hover:bg-surface-container transition-all">*/}
                        {/*            <span className="material-symbols-outlined text-[20px]">chevron_left</span></button>*/}
                        {/*        <button*/}
                        {/*            className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-bold text-label-sm">1*/}
                        {/*        </button>*/}
                        {/*        <button*/}
                        {/*            className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant bg-surface-container-lowest hover:bg-surface-container transition-all text-label-sm">2*/}
                        {/*        </button>*/}
                        {/*        <button*/}
                        {/*            className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant bg-surface-container-lowest hover:bg-surface-container transition-all text-label-sm">3*/}
                        {/*        </button>*/}
                        {/*        <button*/}
                        {/*            className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant bg-surface-container-lowest hover:bg-surface-container transition-all">*/}
                        {/*            <span className="material-symbols-outlined text-[20px]">chevron_right</span>*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    {/*<div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">*/}
                    {/*    <div*/}
                    {/*        className="bg-surface-container-lowest p-md border border-outline-variant rounded-xl shadow-sm">*/}
                    {/*        <h6 className="font-headline-md text-headline-md text-on-surface mb-md">Ajustes Rápidos</h6>*/}
                    {/*        <div className="grid grid-cols-2 gap-sm">*/}
                    {/*            <button*/}
                    {/*                className="flex flex-col items-center justify-center gap-xs p-md bg-surface-container-low rounded-xl border border-transparent hover:border-primary transition-all group">*/}
                    {/*            <span*/}
                    {/*                className="material-symbols-outlined text-primary bg-primary/10 p-sm rounded-full group-hover:scale-110 transition-transform">add_box</span>*/}
                    {/*                <span className="font-label-md text-label-md text-on-surface">Entrada</span>*/}
                    {/*            </button>*/}
                    {/*            <button*/}
                    {/*                className="flex flex-col items-center justify-center gap-xs p-md bg-surface-container-low rounded-xl border border-transparent hover:border-error transition-all group">*/}
                    {/*            <span*/}
                    {/*                className="material-symbols-outlined text-error bg-error/10 p-sm rounded-full group-hover:scale-110 transition-transform">indeterminate_check_box</span>*/}
                    {/*                <span className="font-label-md text-label-md text-on-surface">Salida</span>*/}
                    {/*            </button>*/}
                    {/*            <button*/}
                    {/*                className="flex flex-col items-center justify-center gap-xs p-md bg-surface-container-low rounded-xl border border-transparent hover:border-secondary transition-all group">*/}
                    {/*            <span*/}
                    {/*                className="material-symbols-outlined text-secondary bg-secondary-container p-sm rounded-full group-hover:scale-110 transition-transform">swap_horiz</span>*/}
                    {/*                <span className="font-label-md text-label-md text-on-surface">Transferencia</span>*/}
                    {/*            </button>*/}
                    {/*            <button*/}
                    {/*                className="flex flex-col items-center justify-center gap-xs p-md bg-surface-container-low rounded-xl border border-transparent hover:border-tertiary transition-all group">*/}
                    {/*            <span*/}
                    {/*                className="material-symbols-outlined text-tertiary bg-tertiary-fixed p-sm rounded-full group-hover:scale-110 transition-transform">inventory</span>*/}
                    {/*                <span className="font-label-md text-label-md text-on-surface">Auditoría</span>*/}
                    {/*            </button>*/}
                    {/*        </div>*/}
                    {/*        <div className="mt-md p-sm bg-surface-container-high/50 rounded-lg">*/}
                    {/*            <p className="text-on-surface-variant font-label-sm text-label-sm mb-xs">Última*/}
                    {/*                auditoría: <span className="text-on-surface font-semibold">Hoy, 08:32 AM</span></p>*/}
                    {/*            <div className="w-full bg-surface-container rounded-full h-1 overflow-hidden">*/}
                    {/*                <div className="bg-primary h-full"*/}
                    {/*                    // style="width: 92%"*/}
                    {/*                ></div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div*/}
                    {/*        className="bg-surface-container-lowest p-md border border-outline-variant rounded-xl shadow-sm flex-1">*/}
                    {/*        <div className="flex items-center justify-between mb-md">*/}
                    {/*            <h6 className="font-headline-md text-headline-md text-on-surface">Movimientos*/}
                    {/*                Recientes</h6>*/}
                    {/*            <a className="text-primary font-label-sm text-label-sm hover:underline" href="#">Ver*/}
                    {/*                Todo</a>*/}
                    {/*        </div>*/}
                    {/*        <div className="space-y-md max-h-100 overflow-y-auto custom-scrollbar pr-xs">*/}
                    {/*            <div className="flex gap-md">*/}
                    {/*                <div className="relative">*/}
                    {/*                    <div*/}
                    {/*                        className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center z-10 relative">*/}
                    {/*                    <span*/}
                    {/*                        className="material-symbols-outlined text-[18px] text-on-primary-fixed-variant">add</span>*/}
                    {/*                    </div>*/}
                    {/*                    <div*/}
                    {/*                        className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-full bg-outline-variant"></div>*/}
                    {/*                </div>*/}
                    {/*                <div className="flex-1 pb-md">*/}
                    {/*                    <p className="font-label-md text-label-md text-on-surface">Llegada de Stock</p>*/}
                    {/*                    <p className="text-on-surface-variant text-label-sm font-label-sm">Nike Air Max*/}
                    {/*                        Pro*/}
                    {/*                        (+400 unidades)</p>*/}
                    {/*                    <p className="text-on-surface-variant text-[10px] mt-xs">Hace 2 horas •*/}
                    {/*                        Verificado*/}
                    {/*                        por Admin</p>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="flex gap-md">*/}
                    {/*                <div className="relative">*/}
                    {/*                    <div*/}
                    {/*                        className="w-8 h-8 rounded-full bg-error-container flex items-center justify-center z-10 relative">*/}
                    {/*                    <span*/}
                    {/*                        className="material-symbols-outlined text-[18px] text-on-error-container">remove</span>*/}
                    {/*                    </div>*/}
                    {/*                    <div*/}
                    {/*                        className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-full bg-outline-variant"></div>*/}
                    {/*                </div>*/}
                    {/*                <div className="flex-1 pb-md">*/}
                    {/*                    <p className="font-label-md text-label-md text-on-surface">Stock Dañado</p>*/}
                    {/*                    <p className="text-on-surface-variant text-label-sm font-label-sm">Sony*/}
                    {/*                        WH-1000XM4*/}
                    {/*                        (-4 unidades)</p>*/}
                    {/*                    <p className="text-on-surface-variant text-[10px] mt-xs">Hace 5 horas • Almacén*/}
                    {/*                        A</p>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="flex gap-md">*/}
                    {/*                <div className="relative">*/}
                    {/*                    <div*/}
                    {/*                        className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center z-10 relative">*/}
                    {/*                    <span*/}
                    {/*                        className="material-symbols-outlined text-[18px] text-on-secondary-container">sync</span>*/}
                    {/*                    </div>*/}
                    {/*                    <div*/}
                    {/*                        className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-full bg-outline-variant"></div>*/}
                    {/*                </div>*/}
                    {/*                <div className="flex-1 pb-md">*/}
                    {/*                    <p className="font-label-md text-label-md text-on-surface">Transferencia*/}
                    {/*                        Interna</p>*/}
                    {/*                    <p className="text-on-surface-variant text-label-sm font-label-sm">Classic*/}
                    {/*                        Wayfarer*/}
                    {/*                        (20 unidades)</p>*/}
                    {/*                    <p className="text-on-surface-variant text-[10px] mt-xs">Ayer • Central a Bahía*/}
                    {/*                        Norte</p>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="flex gap-md">*/}
                    {/*                <div className="relative">*/}
                    {/*                    <div*/}
                    {/*                        className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center z-10 relative">*/}
                    {/*                    <span*/}
                    {/*                        className="material-symbols-outlined text-[18px] text-on-primary-fixed-variant">add</span>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*                <div className="flex-1">*/}
                    {/*                    <p className="font-label-md text-label-md text-on-surface">Entrada Inicial</p>*/}
                    {/*                    <p className="text-on-surface-variant text-label-sm font-label-sm">Smart Mirror*/}
                    {/*                        S1*/}
                    {/*                        (+50 unidades)</p>*/}
                    {/*                    <p className="text-on-surface-variant text-[10px] mt-xs">24 Oct, 2023 • Nuevo*/}
                    {/*                        SKU</p>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                {/*<section className="mt-lg">*/}
                {/*    <div*/}
                {/*        className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">*/}
                {/*        <div className="p-md border-b border-outline-variant flex items-center justify-between">*/}
                {/*            <div>*/}
                {/*                <h5 className="font-headline-md text-headline-md text-on-surface">Historial de*/}
                {/*                    Inventario</h5>*/}
                {/*                <p className="text-on-surface-variant font-label-sm text-label-sm">Registro completo de*/}
                {/*                    todos los cambios de stock para auditorías.</p>*/}
                {/*            </div>*/}
                {/*            <div className="flex gap-sm">*/}
                {/*                <select*/}
                {/*                    className="bg-surface-container-low border border-outline-variant rounded-lg px-md py-xs text-label-sm font-label-sm focus:ring-primary">*/}
                {/*                    <option>Últimos 7 días</option>*/}
                {/*                    <option>Últimos 30 días</option>*/}
                {/*                    <option>Rango personalizado</option>*/}
                {/*                </select>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="overflow-x-auto">*/}
                {/*            <table className="w-full text-left">*/}
                {/*                <thead className="bg-surface-container-low border-b border-outline-variant">*/}
                {/*                <tr>*/}
                {/*                    <th className="px-md py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">ID*/}
                {/*                        Transacción*/}
                {/*                    </th>*/}
                {/*                    <th className="px-md py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Fecha*/}
                {/*                        y Hora*/}
                {/*                    </th>*/}
                {/*                    <th className="px-md py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Actividad</th>*/}
                {/*                    <th className="px-md py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Realizado*/}
                {/*                        por*/}
                {/*                    </th>*/}
                {/*                    <th className="px-md py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Cambio</th>*/}
                {/*                    <th className="px-md py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Nuevo*/}
                {/*                        Saldo*/}
                {/*                    </th>*/}
                {/*                </tr>*/}
                {/*                </thead>*/}
                {/*                <tbody className="divide-y divide-outline-variant">*/}
                {/*                <tr className="hover:bg-surface-container transition-colors">*/}
                {/*                    <td className="px-md py-sm font-numeric-data text-label-sm text-on-surface-variant">#INV-99082</td>*/}
                {/*                    <td className="px-md py-sm text-label-sm text-on-surface-variant">25 Oct, 14:20</td>*/}
                {/*                    <td className="px-md py-sm">*/}
                {/*                        <div className="flex items-center gap-xs">*/}
                {/*                        <span*/}
                {/*                            className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>*/}
                {/*                            <span className="text-label-sm font-label-md text-on-surface">Envío de Proveedor Recibido</span>*/}
                {/*                        </div>*/}
                {/*                    </td>*/}
                {/*                    <td className="px-md py-sm text-label-sm text-on-surface-variant">Jordan Miller</td>*/}
                {/*                    <td className="px-md py-sm font-bold text-primary text-label-sm">+1,200</td>*/}
                {/*                    <td className="px-md py-sm font-numeric-data text-label-sm text-on-surface">5,430</td>*/}
                {/*                </tr>*/}
                {/*                <tr className="hover:bg-surface-container transition-colors">*/}
                {/*                    <td className="px-md py-sm font-numeric-data text-label-sm text-on-surface-variant">#INV-99075</td>*/}
                {/*                    <td className="px-md py-sm text-label-sm text-on-surface-variant">25 Oct, 11:45</td>*/}
                {/*                    <td className="px-md py-sm">*/}
                {/*                        <div className="flex items-center gap-xs">*/}
                {/*                        <span*/}
                {/*                            className="material-symbols-outlined text-[16px] text-on-secondary-container">point_of_sale</span>*/}
                {/*                            <span className="text-label-sm font-label-md text-on-surface">Entrada de Venta POS</span>*/}
                {/*                        </div>*/}
                {/*                    </td>*/}
                {/*                    <td className="px-md py-sm text-label-sm text-on-surface-variant">Terminal 02</td>*/}
                {/*                    <td className="px-md py-sm font-bold text-error text-label-sm">-2</td>*/}
                {/*                    <td className="px-md py-sm font-numeric-data text-label-sm text-on-surface">4,230</td>*/}
                {/*                </tr>*/}
                {/*                <tr className="hover:bg-surface-container transition-colors">*/}
                {/*                    <td className="px-md py-sm font-numeric-data text-label-sm text-on-surface-variant">#INV-99012</td>*/}
                {/*                    <td className="px-md py-sm text-label-sm text-on-surface-variant">24 Oct, 09:12</td>*/}
                {/*                    <td className="px-md py-sm">*/}
                {/*                        <div className="flex items-center gap-xs">*/}
                {/*                        <span*/}
                {/*                            className="material-symbols-outlined text-[16px] text-tertiary">edit</span>*/}
                {/*                            <span className="text-label-sm font-label-md text-on-surface">Corrección Manual de Stock</span>*/}
                {/*                        </div>*/}
                {/*                    </td>*/}
                {/*                    <td className="px-md py-sm text-label-sm text-on-surface-variant">Sarah Chen</td>*/}
                {/*                    <td className="px-md py-sm font-bold text-secondary text-label-sm">-15</td>*/}
                {/*                    <td className="px-md py-sm font-numeric-data text-label-sm text-on-surface">4,232</td>*/}
                {/*                </tr>*/}
                {/*                </tbody>*/}
                {/*            </table>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</section>*/}
            </main>
        </main>
    )
}