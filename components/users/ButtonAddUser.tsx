"use client"
import {useState} from "react";
import ModalUser from "@/components/users/ModalUser";

export default function ButtonAddUser() {
    const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpenCreateUserModal(true)}
                className="bg-primary text-white px-xl py-md rounded-lg font-bold flex items-center justify-center gap-md shadow-sm hover:brightness-110 active:scale-95 transition-all">
                <span className="material-symbols-outlined">person_add</span>
                <span>Nuevo Usuario</span>
            </button>
            <>
                {openCreateUserModal && (
                    <ModalUser
                        mode="create"
                        onClick={() => setOpenCreateUserModal(false)}
                        onClick1={() => setOpenCreateUserModal(false)}
                    />
                )}
            </>
        </>
    );
}