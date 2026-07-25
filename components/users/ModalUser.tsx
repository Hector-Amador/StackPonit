import React, { useState, useEffect } from "react";
import { ModalUserProps } from "@/types/modalUser";
import {createUser, updateUser} from "@/actions/users";
import {useRouter} from "next/navigation";

export default function ModalUser({
                                      user,
                                      mode,
                                      onClick,
                                      onClick1,
                                  }: ModalUserProps) {
    const isEdit = mode === "edit";
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        photo: null as File | null,
    });

    useEffect(() => {
        if (!user) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData({
            name: user.full_name,
            email: user.email ?? "",
            password: "",
            role: String(user.role_id),
            photo: null,
        });
    }, [user]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
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
                if (!user) {
                    throw new Error("User requerido para editar");
                }

                await updateUser({
                    id: user.id,
                    name: formData.name,
                    email: formData.email,
                    role: formData.role,
                });
            } else {
                await createUser({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                });
            }

            onClick();
            router.refresh();

        } catch (error) {
            console.error(error);
            alert(
                isEdit
                    ? "Error al actualizar usuario"
                    : "Error al crear usuario"
            );
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                        {isEdit ? "Editar Usuario" : "Crear Usuario"}
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
                            placeholder="John Doe"
                            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-transparent"
                        />
                    </div>

                    <div>
                        <label className="flex justify-start mb-2 text-sm font-medium">
                            Correo Electrónico
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@email.com"
                            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-transparent"
                        />
                    </div>

                    {!isEdit && (
                        <div>
                            <label className="flex justify-start mb-2 text-sm font-medium">
                                Contraseña
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-transparent"
                            />
                        </div>
                    )}

                    <div>
                        <label className="flex justify-start mb-2 text-sm font-medium">
                            Rol
                        </label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border border-outline-variant rounded-lg px-4 py-3 bg-transparent"
                        >
                            <option value="">
                                Seleccione una opción
                            </option>
                            <option value="1">
                                Admin
                            </option>

                            <option value="2">
                                Employee
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="flex justify-start mb-2 text-sm font-medium">
                            Foto de Perfil
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border border-outline-variant rounded-lg px-4 py-3"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
                        <button
                            type="button"
                            onClick={onClick1}
                            className="px-5 py-2 rounded-lg border hover:bg-surface-container transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-primary text-white hover:brightness-110 transition-all"
                        >
                            {isEdit ? "Guardar Cambios" : "Crear Usuario"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
