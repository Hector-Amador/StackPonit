// import { revalidatePath } from "next/cache";
"use server"
import { supabaseAdmin } from "@/lib/supabase/supabase-admin";

interface CreateBrandDto {
    name: string;
}

interface CreateCategoryDto {
    name: string;
}

interface CreateSubcategoryDto {
    name: string;
    category_id: number;
}


export async function createBrand(data: CreateBrandDto) {
    const { error } = await supabaseAdmin
        .from("brands")
        .insert({
            name: data.name.trim(),
        });

    if (error) {
        throw new Error(error.message);
    }

    // revalidatePath("/inventory");
}

export async function createCategory(data: CreateCategoryDto) {
    const { error } = await supabaseAdmin
        .from("categories")
        .insert({
            name: data.name.trim(),
        });

    if (error) {
        throw new Error(error.message);
    }

    // revalidatePath("/inventory");
}


export async function createSubcategory(
    data: CreateSubcategoryDto
) {
    const { error } = await supabaseAdmin
        .from("subcategories")
        .insert({
            name: data.name.trim(),
            category_id: data.category_id,
        });

    if (error) {
        throw new Error(error.message);
    }

    // revalidatePath("/inventory");
}