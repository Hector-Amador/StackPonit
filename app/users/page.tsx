import Menu from "@/components/Menu";
import {getCurrentUser} from "@/lib/auth/get_curret_user";
import {redirect} from "next/navigation";
import Header from "@/components/Header";
import ButtonAddUser from "@/components/users/ButtonAddUser";
import ButtonEditUser from "@/components/users/ButtonEditUser";
import {getUsers} from "@/actions/users";
import ButtonDeleteUser from "@/components/users/ButtonDeleteUser";
import Image from "next/image";

export default async function Users() {
    const currentUser = await getCurrentUser();

    if (!currentUser?.isAdmin) {
        redirect("/market");
    }

    const users = await getUsers();

    return (
        <main className="bg-surface text-on-surface">
            <Header/>
            <div className="flex min-h-screen">
                <Menu currentUser={currentUser}/>
                <main className="ml-20 flex-1 p-lg bg-surface min-h-screen">
                    <nav className="flex items-center gap-sm text-on-surface-variant mb-md font-label-sm text-label-sm">
                        <a className="hover:text-primary transition-colors" href="#">Configuración</a>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                        <span className="text-on-surface font-semibold">Gestión de usuarios</span>
                    </nav>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-xl">
                        <div>
                            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Gestión de usuarios</h1>
                            <p className="font-body-md text-body-md text-on-surface-variant">Gestiona el acceso, los roles y los permisos de seguridad de los empleados en toda tu tienda.</p>
                        </div>
                        <ButtonAddUser/>
                    </div>
                    <div
                        className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant flex flex-col lg:flex-row gap-md items-center mb-lg shadow-sm">
                        <div className="relative flex-1 w-full">
                        <span
                            className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                            <input
                                className="w-full pl-xl pr-md py-sm rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-on-surface font-body-md"
                                placeholder="Search by name, email, or role..." type="text"/>
                        </div>
                        <div className="flex gap-md w-full lg:w-auto">
                            <div className="flex-1 lg:w-48">
                                <select
                                    className="w-full px-md py-sm rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary bg-white text-on-surface font-body-md appearance-none">
                                    <option>All Roles</option>
                                    <option>Admin</option>
                                    <option>Manager</option>
                                    <option>Cashier</option>
                                </select>
                            </div>
                            <div className="flex-1 lg:w-48">
                                <select
                                    className="w-full px-md py-sm rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary bg-white text-on-surface font-body-md appearance-none">
                                    <option>All Status</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                            <button
                                className="p-sm bg-surface-container-high text-on-surface-variant rounded-lg border border-outline-variant hover:bg-surface-variant transition-colors">
                                <span className="material-symbols-outlined">filter_list</span>
                            </button>
                        </div>
                    </div>
                    <div
                        className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="bg-surface-container border-b border-outline-variant">
                                    <th className="px-xl py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Usuario</th>
                                    <th className="px-xl py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Rol</th>
                                    {/*<th className="px-xl py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>*/}
                                    <th className="px-xl py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Creado
                                    </th>
                                    <th className="px-xl py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Acciones</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-surface-container-low transition-colors">
                                        <td className="px-xl py-md">
                                            <div className="flex items-center gap-md">
                                                <div
                                                    className="h-10 w-10 rounded-full bg-surface-dim overflow-hidden border border-outline-variant">
                                                    <Image
                                                        alt={"profile"}
                                                        width={40}
                                                        height={40}
                                                        className="w-full h-full object-cover"
                                                        data-alt="A high-quality corporate headshot of Julian Soto, a young man in his mid-20s with a cheerful expression and short-cropped hair. He's wearing a clean white shirt. Background is a brightly lit, minimalist retail checkout area with professional depth-of-field blur. Clean, crisp light-mode aesthetic."
                                                        src={user.avatar_url ?? "/images/default-avatar.svg"}/>
                                                </div>
                                                <div>
                                                    <div
                                                        className="font-body-md text-body-md font-bold text-on-surface">{user.full_name}</div>
                                                    <div className="text-xs text-on-surface-variant">{user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-xl py-md"><span
                                            className="px-sm py-xs bg-outline-variant text-on-surface-variant rounded-full font-label-sm text-[11px] font-bold uppercase tracking-tight">{user.roles?.name}</span>
                                        </td>
                                        {/*<td className="px-xl py-md">*/}
                                        {/*    <div className="flex items-center gap-sm"><span*/}
                                        {/*        className="w-2 h-2 rounded-full bg-green-500"></span> <span*/}
                                        {/*        className="font-body-md text-body-md text-on-surface">Activo</span>*/}
                                        {/*    </div>*/}
                                        {/*</td>*/}
                                        <td className="px-xl py-md text-on-surface-variant font-body-md text-body-md">{user.created_at}
                                        </td>
                                        <td className="px-xl py-md text-right">
                                            <div className="flex items-center justify-end gap-sm">
                                                <ButtonEditUser user={user} />
                                                {/*<button*/}
                                                {/*    className="p-sm text-green-600 transition-colors hover:bg-green-50 rounded-lg">*/}
                                                {/*    <span className="material-symbols-outlined">toggle_on</span>*/}
                                                {/*</button>*/}
                                                <ButtonDeleteUser userId={user.id} />
                                            </div>
                                        </td>
                                    </tr>

                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div
                            className="px-xl py-md bg-surface-container flex items-center justify-between border-t border-outline-variant">
                        <span
                            className="font-label-sm text-label-sm text-on-surface-variant">Showing 1 to 4 of 24 users</span>
                            <div className="flex items-center gap-sm">
                                <button
                                    className="p-sm rounded-lg border border-outline-variant disabled:opacity-50 hover:bg-surface transition-colors">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button
                                    className="px-md py-sm rounded-lg bg-primary text-white font-bold font-label-sm text-label-sm">1
                                </button>
                                <button
                                    className="px-md py-sm rounded-lg hover:bg-surface transition-colors font-label-sm text-label-sm">2
                                </button>
                                <button
                                    className="px-md py-sm rounded-lg hover:bg-surface transition-colors font-label-sm text-label-sm">3
                                </button>
                                <button
                                    className="p-sm rounded-lg border border-outline-variant hover:bg-surface transition-colors">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </main>
    )
}
