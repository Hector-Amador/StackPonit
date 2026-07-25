"use client";
import {useState} from "react";
import ClassificationModal from "@/components/inventory/classificationModal";
import { createCategory } from "@/actions/classification";

export default function ButtonAddCategory() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpenModal(true)}
                className="bg-primary text-on-primary px-md py-sm rounded-lg font-label-md text-label-md flex items-center gap-xs shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">add</span> Añadir Categoría
            </button>
            <>
                {openModal && (
                    <ClassificationModal
                        title="Category"
                        onSubmit={createCategory}
                        onClose={() => setOpenModal(false)}
                    />
                )}
            </>
        </>
    )
}
