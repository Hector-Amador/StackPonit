import React, { useState } from "react";
import {useRouter} from "next/navigation";
import {ModalProductsProps} from "@/types/inventory";
import { formatDate } from "@/lib/utils/date";
import { createProduct, updateProduct } from "@/actions/products";

export default function ModalProducts({product, mode, onClick, onClick1, brands, categories, subCategories = []}: ModalProductsProps) {
    const isEdit = mode === "edit";
    const router = useRouter();

    const [formData, setFormData] = useState(() => ({
        barcode: product?.barcode ?? "",
        sku: product?.sku ?? "",
        name: product?.name ?? "",
        description: product?.description ?? "",
        brand_id: product?.brand_id ?? 0,
        category_id: product?.category_id ?? 0,
        subcategory_id: product?.subcategory_id ?? 0,
        cost_price: product?.cost_price ?? 0,
        sale_price: product?.sale_price ?? 0,
        stock: product?.stock ?? 0,
        marca: product?.brands.name ?? [],
        min_stock: product?.min_stock ?? 0,
        image_url: product?.image_url ?? "",
        is_active: product?.is_active ?? true,
        category_name: product?.subcategories?.categories?.name ?? "",
        subCategory_name: product?.subcategories?.name ?? "",
        created_at: product?.created_at ?? "",
        updated_at: product?.updated_at ?? "",
    }));

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: [
                "brand_id",
                "category_id",
                "subcategory_id",
                "cost_price",
                "sale_price",
                "stock",
                "min_stock",
            ].includes(name)
                ? Number(value)
                : value,
        }));
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            photo: e.target.files?.[0] || null,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEdit) {
                if (!product) {
                    throw new Error("No se encontró el producto para editar");
                }

                console.log("Editando prod");
                console.log(formData, "hola")
                await updateProduct({
                    id: product.id,
                    barcode: formData.barcode,
                    sku: formData.sku,
                    name: formData.name,
                    description: formData.description,
                    brand_id: formData.brand_id,
                    subcategory_id: formData.subcategory_id,
                    cost_price: Number(formData.cost_price),
                    sale_price: Number(formData.sale_price),
                    stock: Number(formData.stock),
                    min_stock: Number(formData.min_stock),
                    image_url: formData.image_url,
                    is_active: formData.is_active,
                });
            } else {
                console.log("crear prod");
                console.log(formData)
                await createProduct({
                    barcode: formData.barcode,
                    sku: formData.sku,
                    name: formData.name,
                    description: formData.description,
                    brand_id: formData.brand_id,
                    subcategory_id: formData.subcategory_id,
                    cost_price: Number(formData.cost_price),
                    sale_price: Number(formData.sale_price),
                    stock: Number(formData.stock),
                    min_stock: Number(formData.min_stock),
                    image_url: formData.image_url,
                    is_active: formData.is_active,
                });

                onClick();
            }

            onClick();
            router.refresh();

        } catch (error) {
            console.error(error);
            alert(
                isEdit
                    ? "Error al actualizar producto"
                    : "Error al crear producto"
            );
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-primary text-2xl font-bold">
                        {isEdit ? "Editar Producto" : "Añadir Producto"}
                    </h2>
                    <button
                        onClick={onClick}
                        className="material-symbols-outlined text-2xl hover:text-red-500 transition-colors"
                    >
                        close
                    </button>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >

                    <div>
                        <label className="flex justify-start mb-2 text-sm font-medium">
                            Nombre
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Coca Cola 600ml"
                            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-transparent"
                        />
                    </div>

                    <div>
                        <label className="flex justify-start mb-2 text-sm font-medium">
                            SKU
                        </label>

                        <input
                            type="text"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            placeholder="COC-600"
                            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-transparent"
                        />
                    </div>

                    <div>
                        <label className="flex justify-start mb-2 text-sm font-medium">
                            Código de Barras
                        </label>

                        <input
                            type="text"
                            name="barcode"
                            value={formData.barcode}
                            onChange={handleChange}
                            placeholder="750105530001"
                            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-transparent"
                        />
                    </div>

                    <div>
                        <label className="flex justify-start mb-2 text-sm font-medium">
                            Descripción
                        </label>

                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-transparent"
                        />
                    </div>

                    <div>
                        <label className="flex flex-row justify-between mb-2 text-sm font-medium">
                            <p>Marca</p>
                            <div className="p-1 px-2 bg-primary rounded"><p className="text-white">{formData.marca}</p></div>
                        </label>

                        <select
                            name="brand_id"
                            value={formData.brand_id}
                            onChange={handleChange}
                            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-transparent"
                        >
                            <option value={product?.brand_id}>
                                Selecciona una Marca
                            </option>

                            {brands.map((brand) => (
                                <option
                                    key={brand.id}
                                    value={brand.id}
                                >
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="flex flex-row justify-between mb-2 text-sm font-medium">
                            <p>Categoría</p>
                            <div className="p-1 px-2 bg-primary rounded"><p className="text-white">{formData.category_name}</p></div>
                        </label>

                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-transparent"
                        >
                            <option value={formData.category_id}>
                                Selecciona una Marca
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div>
                        <label className="flex flex-row justify-between mb-2 text-sm font-medium">
                            <p>Sub Categoría</p>
                            <div className="p-1 px-2 bg-primary rounded"><p className="text-white">{formData.subCategory_name}</p></div>
                        </label>

                        <select
                            name="subcategory_id"
                            value={formData.subcategory_id}
                            onChange={handleChange}
                            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-transparent"
                        >
                            <option value={product?.subcategory_id}>
                                Selecciona de una Sub categoria
                            </option>

                            {subCategories.map((subcategory) => (
                                <option
                                    key={subcategory.id}
                                    value={subcategory.id}
                                >
                                    {subcategory.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex justify-start mb-2 text-sm font-medium">
                                Precio Costo
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                name="cost_price"
                                value={formData.cost_price}
                                onChange={handleChange}
                                className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-transparent"
                            />
                        </div>

                        <div>
                            <label className="flex justify-start mb-2 text-sm font-medium">
                                Precio Venta
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                name="sale_price"
                                value={formData.sale_price}
                                onChange={handleChange}
                                className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-transparent"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex justify-start mb-2 text-sm font-medium">
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-transparent"
                            />
                        </div>

                        <div>
                            <label className="flex justify-start mb-2 text-sm font-medium">
                                Stock Mínimo
                            </label>

                            <input
                                type="number"
                                name="min_stock"
                                value={formData.min_stock}
                                onChange={handleChange}
                                className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="flex justify-start mb-2 text-sm font-medium">
                            Imagen
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border border-outline-variant rounded-lg px-4 py-3"
                        />
                    </div>

                    {isEdit ? (
                        <div className="text-sm flex flex-row justify-between">
                            <div>
                                <p>Creado: <span className="text-primary">{formatDate(formData.created_at)}</span></p>
                            </div>
                            <div>
                                <p>Actualizado: <span className="text-primary">{formatDate(formData.updated_at)}</span></p>
                            </div>
                        </div>
                    ) : null}

                    <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
                        <button
                            type="button"
                            onClick={onClick1}
                            className="px-5 py-2 rounded-lg border hover:bg-surface-container transition-colors"
                        >
                            Cancelar
                        </button>

                        {isEdit ? (
                            <button
                                type="button"
                                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:brightness-110 transition-all"
                            >
                                Borrar Producto
                            </button>
                        ) : null}

                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-primary text-white hover:brightness-110 transition-all"
                        >
                            {isEdit ? "Guardar Cambios" : "Crear Producto"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
