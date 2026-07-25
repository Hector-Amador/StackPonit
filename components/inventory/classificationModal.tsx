"use client";

import React, { useState } from "react";

interface ModalClassificationProps {
    title: string;
    onClose: () => void;
    onSubmit: (data: {
        name: string;
        category_id?: number;
    }) => Promise<void>;
    categories?: {
        id: number;
        name: string;
    }[];
}

export default function ClassificationModal({
                                                title,
                                                onClose,
                                                onSubmit,
                                                categories,
                                            }: ModalClassificationProps) {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        category_id: 0,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "category_id"
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            await onSubmit({
                name: formData.name,
                category_id:
                    formData.category_id || undefined,
            });

            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-surface p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-primary text-2xl font-bold">
                        Agregar {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="material-symbols-outlined text-2xl"
                    >
                        close
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Nombre
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={`Nombre de la ${title.toLowerCase()}`}
                            className="w-full border rounded-lg px-4 py-3"
                            required
                        />
                    </div>

                    {categories && (
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Categoría
                            </label>

                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3"
                            >
                                <option value={0}>
                                    Selecciona una categoría
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
                    )}

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 border rounded-lg"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 rounded-lg bg-primary text-white disabled:opacity-50"
                        >
                            {loading
                                ? "Guardando..."
                                : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}