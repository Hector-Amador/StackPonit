import {getCurrentUser} from "@/lib/auth/get_curret_user";
import Image from "next/image";

export default async function Header() {
    const currentUser = await getCurrentUser();
    const avatarSrc = currentUser?.avatar_url ?? "/images/default-avatar.svg";

    return (
        <header className="flex justify-between items-center w-full px-lg py-2 h-touch-target sticky top-0 z-50 bg-surface border-b border-outline-variant">
            <div className="flex items-center gap-lg">
                <a href="/dashboard">
                    <img
                        src="/images/logo.webp"
                        alt="logo"
                        width={70}
                        height={60}
                    />
                </a>
                {/*<div className="relative w-60 md:w-96">*/}
                {/*    <span*/}
                {/*        className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>*/}
                {/*    <input*/}
                {/*        className="w-full bg-surface-container-low border-none rounded-lg pl-xl pr-md py-xs focus:ring-2 focus:ring-primary text-body-md"*/}
                {/*        placeholder="Buscar inventario, SKUs o ubicaciones..." type="text"/>*/}
                {/*</div>*/}
            </div>
            <div className="flex items-center gap-md">
                {/*<button className="text-on-surface-variant hover:text-primary transition-all p-sm"><span*/}
                {/*    className="material-symbols-outlined">notifications</span>*/}
                {/*</button>*/}
                <button className="text-on-surface-variant hover:text-primary transition-all p-sm"><span
                    className="material-symbols-outlined">contrast</span>
                </button>
                {/*<button*/}
                {/*    className="text-secondary font-label-md text-label-md hover:text-primary transition-all">Soporte*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    className="bg-primary text-on-primary px-lg py-sm rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all">Nuevo*/}
                {/*    Pedido*/}
                {/*</button>*/}
                <div className="w-8 h-8 rounded-full overflow-hidden ml-sm">
                    <Image width={50} height={50} alt="Photo Profile" className="h-full object-cover"
                         src={avatarSrc}/>
                </div>
            </div>
        </header>
    )
}
