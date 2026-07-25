"use server";
import { supabaseAdmin } from "@/lib/supabase/supabase-admin";
import type {UserListItem} from "@/types/buttonEditModalTypes";

interface UpdateUserDto {
    id: string;
    name: string;
    email: string;
    role: string;
}

export async function getUsers(): Promise<UserListItem[]> {

    const { data, error } = await supabaseAdmin
        .from("profiles")
        .select(`
            id,
            full_name,
            email,
            created_at,
            avatar_url,
            role_id,
            roles (
                id,
                name
            )
        `);

    if (error) {
        throw error;
    }

    return (data ?? []) as unknown as UserListItem[];
}

export async function createUser(data: { name: string; email: string; password: string; role: string; }) {
    const { data: authData, error } =
        await supabaseAdmin.auth.admin.createUser({
            email: data.email,
            password: data.password,
            email_confirm: true,
        });

    if (error) {
        throw error;
    }

    const { error: profileError } =
        await supabaseAdmin
            .from("profiles")
            .insert({
                id: authData.user.id,
                full_name: data.name,
                email: authData.user.email,
                role_id: Number(data.role),
            })
            .select();

    if (profileError) {
        console.error(profileError);
        throw profileError;
    }

    return true;
};

export async function deleteUser(userId: string) {

    const { error } =
        await supabaseAdmin.auth.admin.deleteUser(
            userId
        );

    if (error) {
        throw new Error(error.message);
    }

    return true;
}

export async function updateUser(data: UpdateUserDto) {

    const { error: authError } =
        await supabaseAdmin.auth.admin.updateUserById(
            data.id,
            {
                email: data.email,
            }
        );

    if (authError) {
        throw new Error(authError.message);
    }

    const { error: profileError } =
        await supabaseAdmin
            .from("profiles")
            .update({
                full_name: data.name,
                email: data.email,
                role_id: Number(data.role),
            })
            .eq("id", data.id);

    if (profileError) {
        throw new Error(profileError.message);
    }

    return true;
}
