"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Login() {
    const supabase = createClient();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(error.message);
            return;
        }

        router.push("/dashboard");
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-md">
            <div className="w-full max-w-110 z-10">
                <div
                    className="glass-card rounded-xl p-xl shadow-[0px_4px_6px_rgba(0,0,0,0.2)] flex flex-col gap-lg transform transition-all duration-300">
                    <header className="flex flex-col gap-xs">
                        <h2 className="text-[30px] font-headline-md text-headline-md text-primary">Bienvenido de nuevo</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">Inicia sesión para gestionar tu tienda.</p>
                    </header>
                    <form
                        className="flex flex-col gap-md"
                        id="loginForm"
                        onSubmit={login}
                    >
                        <div className="flex flex-col gap-xs">
                            <label className="font-label-md text-label-md text-on-surface-variant ml-xs" htmlFor="email">Correo
                                Electrónico</label>
                            <div className="relative">
                                <span
                                    className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline"
                                    data-icon="mail">mail</span>
                                <input
                                    className="w-full h-12 pl-11 pr-md bg-[#F1F5F9] border-none rounded-lg font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary-container transition-all"
                                    id="email"
                                    placeholder="example@stackpoint.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-xs">
                            <label className="font-label-md text-label-md text-on-surface-variant ml-xs"
                                   htmlFor="password">Contraseña</label>
                            <div className="relative">
                                <span
                                    className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline"
                                    data-icon="lock">lock</span>
                                <input
                                    className="w-full h-12 pl-11 pr-md bg-[#F1F5F9] border-none rounded-lg font-body-md text-body-md text-on-surface focus:ring-2 focus:ring-primary-container transition-all"
                                    id="password"
                                    placeholder="••••••••••••••"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
                                {/*<button*/}
                                {/*    className="absolute right-md top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"*/}
                                {/*    type="button">*/}
                                {/*    <span className="material-symbols-outlined" data-icon="visibility">visibility</span>*/}
                                {/*</button>*/}
                            </div>
                        </div>
                        {/*<div className="flex items-center justify-between mt-xs">*/}
                        {/*    <label className="flex items-center gap-sm cursor-pointer group">*/}
                        {/*        <div className="relative flex items-center">*/}
                        {/*            <input*/}
                        {/*                className="peer h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary-container transition-all"*/}
                        {/*                type="checkbox"/>*/}
                        {/*        </div>*/}
                        {/*        <span*/}
                        {/*            className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface transition-colors">Recordarme</span>*/}
                        {/*    </label>*/}
                        {/*    <a className="font-label-md text-label-md text-primary hover:underline transition-all" href="#">¿Olvidaste*/}
                        {/*        tu contraseña?*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                        <button
                            className="h-12 mt-md bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-sm transition-all active:scale-[0.98] shadow-sm"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                    {/*<div className="flex items-center gap-md py-sm">*/}
                    {/*    <div className="h-px flex-1 bg-outline-variant"></div>*/}
                    {/*    <span className="font-label-sm text-label-sm text-outline">O REGÍSTRATE MEDIANTE</span>*/}
                    {/*    <div className="h-px flex-1 bg-outline-variant"></div>*/}
                    {/*</div>*/}
                    {/*<div className="grid grid-cols-2 gap-md">*/}
                    {/*    <button*/}
                    {/*        className="h-12 border border-outline-variant hover:bg-surface-container rounded-lg flex items-center justify-center gap-sm font-label-md text-label-md text-on-surface-variant transition-all">*/}
                    {/*        <span className="material-symbols-outlined" data-icon="qr_code_scanner">qr_code_scanner</span>*/}
                    {/*        <span>ID de Empleado</span>*/}
                    {/*    </button>*/}
                    {/*    <button*/}
                    {/*        className="h-12 border border-outline-variant hover:bg-surface-container rounded-lg flex items-center justify-center gap-sm font-label-md text-label-md text-on-surface-variant transition-all">*/}
                    {/*        <span className="material-symbols-outlined" data-icon="nfc">nfc</span>*/}
                    {/*        <span>Tarjeta NFC</span>*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </main>
    )
}