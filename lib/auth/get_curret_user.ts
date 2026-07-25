import { createClient } from "@/lib/supabase/server";
import type {CurrentUser} from "@/types/auth";

type ProfileWithRole = {
    id: string;
    full_name: string;
    avatar_url: string | null;
    role_id: number;
    roles: {
        id: number;
        name: string;
    } | null;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const { data: profile, error } = await supabase
        .from("profiles")
        .select(`
      id,
      full_name,
      avatar_url,
      role_id,
      roles (
        id,
        name
      )
    `)
        .eq("id", user.id)
        .single();

    if (error) {
        throw error;
    }

    const typedProfile = profile as unknown as ProfileWithRole;
    const roleName = typedProfile.roles?.name ?? "";

    return {
        id: user.id,
        email: user.email,

        full_name: typedProfile.full_name,
        avatar_url: typedProfile.avatar_url,

        roleId: typedProfile.role_id,
        role: roleName,

        isAdmin: roleName === "admin",
        isEmployee: roleName === "employee",
    };
}
