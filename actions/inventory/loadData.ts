import {supabaseAdmin} from "@/lib/supabase/supabase-admin";

export async function getLoadData() {
    const [
        { data: brands, error: brandsError },
        { data: categories, error: categoriesError },
        { data: subCategories, error: subCategoriesError },
    ] = await Promise.all([
        supabaseAdmin
            .from("brands")
            .select("id, name"),

        supabaseAdmin
            .from("categories")
            .select("id, name"),

        supabaseAdmin
            .from("subcategories")
            .select(`
                id,
                name,
                category_id
            `),
    ]);

    if (brandsError) throw brandsError;
    if (categoriesError) throw categoriesError;
    if (subCategoriesError) throw subCategoriesError;

    return {
        brands: brands ?? [],
        categories: categories ?? [],
        subCategories: subCategories ?? [],
    };
}