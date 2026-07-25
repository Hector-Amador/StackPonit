"use client";
import { useState } from "react";
import ClassificationModal from "@/components/inventory/classificationModal";
import { createBrand } from "@/actions/classification";

export default function ButtonAddBrand() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpenModal(true)}
                className="bg-primary text-on-primary px-md py-sm rounded-lg font-label-md text-label-md flex items-center gap-xs shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
                <span className="material-symbols-outlined text-[20px]">
                    add
                </span>
                Añadir Marca
            </button>

            {openModal && (
                <ClassificationModal
                    title="Marca"
                    onSubmit={createBrand}
                    onClose={() => setOpenModal(false)}
                />
            )}
        </>
    );
}