"use client";

import { deleteUser } from "@/actions/users";
import { useRouter } from "next/navigation";

export default function ButtonDeleteUser({
                                             userId,
                                         }: {
    userId: string;
}) {

    const router = useRouter();

    const handleDelete = async () => {

        const confirmDelete = confirm(
            "¿Deseas eliminar este usuario?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteUser(userId);

            router.refresh();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="p-sm text-on-surface-variant hover:text-error transition-colors hover:bg-error-container/20 rounded-lg"
        >
            <span className="material-symbols-outlined">
                delete
            </span>
        </button>
    );
}