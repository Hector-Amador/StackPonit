
export interface Category {
    id: number;
    name: string;
}

export interface Subcategory {
    id: number;
    name: string;
    categories?: Category;
}

export interface Brand {
    id: number;
    name: string;
}

export interface Product {
    barcode: string;
    brands: Brand;
    id: number;
    name: string;
    sku: string;
    sale_price: number;
    stock: number;
    image_url: string;
    description: string;
    brand_id: number;
    category_id: number;
    category_name: string;
    subCategory_name: string,
    subcategory_id: number;
    cost_price: number;
    min_stock: number;
    is_active: boolean;
    subcategories: Subcategory;
    created_at: string;
    updated_at: string;
}

export interface DataProductModalProps {
    brands: Brand[];
    categories: Category[];
    subCategories: Subcategory[];
    product: Product;
}

export interface ModalProductsProps {
    mode: "create" | "edit";
    onClick: () => void;
    onClick1: () => void;
    brands: Brand[];
    categories: Category[];
    subCategories?: Subcategory[];
    product?: Product;
}

export interface ButtonAddSubCategoryTypes {
    categories: {
        name: string,
        id: number
    }[]
}