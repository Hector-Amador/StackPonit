"use client";
import {useState} from "react";
import ModalProduct from "@/components/inventory/ModalProducts";
import {DataProductModal} from "@/types/inventory";

export default function ButtonAddProduct({ brands, categories, subCategories }: DataProductModal) {
    const [openCreateProductModal, setOpenCreateProductModal] = useState(false);
    
    return (
        <>
            <button
                onClick={() => setOpenCreateProductModal(true)}
                className="bg-primary text-on-primary px-md py-sm rounded-lg font-label-md text-label-md flex items-center gap-xs shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">add</span> Añadir Producto
            </button>
            <>
                {openCreateProductModal && (
                    <ModalProduct
                        brands={brands}
                        categories={categories}
                        subCategories={subCategories}
                        mode="create"
                        onClick={() => setOpenCreateProductModal(false)}
                        onClick1={() => setOpenCreateProductModal(false)}
                    />
                )}
            </>
        </>
    );
}