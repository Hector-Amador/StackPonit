"use client";
import {useState} from "react";
import ModalProduct from "@/components/inventory/ModalProducts";
import {DataProductModalProps} from "@/types/inventory";

export default function ButtonEditProduct({ product, brands, categories, subCategories }: DataProductModalProps) {
    const [openCreateProductModal, setOpenCreateProductModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpenCreateProductModal(true)}
                className="text-primary hover:underline font-label-sm text-label-sm cursor-pointer">
                Gestionar
            </button>
            <>
                {openCreateProductModal && (
                    <ModalProduct
                        product={product}
                        brands={brands}
                        categories={categories}
                        subCategories={subCategories}
                        mode="edit"
                        onClick={() => setOpenCreateProductModal(false)}
                        onClick1={() => setOpenCreateProductModal(false)}
                    />
                )}
            </>
        </>
    );
}