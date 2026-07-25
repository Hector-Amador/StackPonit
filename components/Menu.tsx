"use client";
import {createClient} from "@/lib/supabase/client";
import {usePathname, useRouter} from "next/navigation";
import {useState} from "react";
import type {CurrentUser} from "@/types/auth";
import Image from "next/image";

type MenuProps = {
    currentUser: CurrentUser | null;
};

export default function Menu({currentUser}: MenuProps) {
    const pathname = usePathname();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const router = useRouter();
    const avatarSrc = currentUser?.avatar_url ?? "/images/default-avatar.svg";

    const logout = async () => {
        const supabase = createClient();

        await supabase.auth.signOut();

        router.push("/login");
    };

    return (
        <aside
            className="flex flex-col h-full pb-15 pt-7 items-center overflow-x-hidden bg-surface-container-low border-r border-outline-variant w-20 hover:w-64 fixed left-0 top-touch-target z-40 transition-all duration-300 group">
            <div className="flex flex-col gap-sm w-full px-sm">
                <a
                    href="/market"
                    className={`flex items-center gap-md p-md transition-all duration-200 active:scale-95 rounded-lg mx-2 ${
                        pathname.startsWith("/market")
                            ? "bg-primary-container text-on-primary-container"
                            : "text-on-surface-variant hover:bg-surface-container-high"
                    }`}>
                    <span className="material-symbols-outlined" data-icon="point_of_sale">point_of_sale</span>
                    <span
                        className="font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity">Market</span>
                </a>
                {currentUser?.isAdmin && (
                    <>
                        <a
                            href="/inventory"
                            className={`flex items-center gap-md p-md transition-all duration-200 active:scale-95 rounded-lg mx-2 ${
                                pathname.startsWith("/inventory")
                                    ? "bg-primary-container text-on-primary-container"
                                    : "text-on-surface-variant hover:bg-surface-container-high"
                            }`}>
                            <span className="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
                            <span
                                className="font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity">Inventory</span>
                        </a>
                        <a
                            href="/dashboard"
                            className={`flex items-center gap-md p-md transition-all duration-200 active:scale-95 rounded-lg mx-2 ${
                                pathname.startsWith("/dashboard")
                                    ? "bg-primary-container text-on-primary-container"
                                    : "text-on-surface-variant hover:bg-surface-container-high"
                            }`}>
                            <span className="material-symbols-outlined" data-icon="analytics">analytics</span>
                            <span
                                className="font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity">Reports</span>
                        </a>
                        <div className="relative">
                            <button
                                onClick={() => setSettingsOpen(!settingsOpen)}
                                className="flex w-[93%] items-center gap-md p-md transition-all duration-200 active:scale-95 text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2"
                            >
                                <span className="material-symbols-outlined">
                                    settings
                                </span>

                                <span className="font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    Settings
                                </span>

                                <span className="material-symbols-outlined ml-auto text-sm">
                                    {settingsOpen ? "expand_less" : "expand_more"}
                                </span>
                            </button>

                            {settingsOpen && (
                                <div className="w-[95%] flex flex-col">
                                    <a
                                        href="/users"
                                        className={`flex items-center gap-md p-md transition-all duration-200 active:scale-95 rounded-lg mx-2 ${
                                            pathname.startsWith("/users")
                                                ? "bg-primary-container text-on-primary-container"
                                                : "text-on-surface-variant hover:bg-surface-container-high"
                                        }`}>
                                        Usuarios
                                    </a>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
            <div className="mt-auto flex flex-col gap-sm w-full px-sm pb-md">
                <section>
                    <div className="flex items-center gap-md p-md mx-2">
                        <div className="material-symbols-outlined w-8 h-8 rounded-full overflow-hidden ml-sm">
                            <Image width={50} height={50} alt="Retrato del Gerente" className="h-full object-cover"
                                   src={avatarSrc}/>
                        </div>
                        <p
                            className="font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity">{currentUser?.full_name}</p>
                    </div>
                </section>
                <button
                    onClick={logout}
                    className="flex items-center gap-md p-md text-error hover:bg-error-container rounded-lg mx-2">
                    <span className="material-symbols-outlined" data-icon="logout">Logout</span>
                    <span
                        className="font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity">Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    )
}
