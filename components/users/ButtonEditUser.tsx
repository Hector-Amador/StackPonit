"use client"
import {useState} from "react";
import ModalUser from "@/components/users/ModalUser";
import { ButtonEditUserProps} from "@/types/buttonEditModalTypes";

export default function ButtonEditUser({user}: ButtonEditUserProps) {
    const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpenCreateUserModal(true)}
                className="p-sm text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded-lg">
                <span className="material-symbols-outlined">edit</span>
            </button>
            {openCreateUserModal && (
                <ModalUser
                    user={user}
                    mode="edit"
                    onClick={() => setOpenCreateUserModal(false)}
                    onClick1={() => setOpenCreateUserModal(false)}
                />
            )}
        </>
    );
}