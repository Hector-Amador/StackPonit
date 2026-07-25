import {supabaseAdmin} from "@/lib/supabase/supabase-admin";
import {Category} from "@/types/inventory";

export async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabaseAdmin
        .from("subcategories")
        .select(`
            id,
            name
        `);

    if (error) {
        throw error;
    }

    return data;
}


