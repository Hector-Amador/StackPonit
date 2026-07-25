import Market from "@/components/market/MarketClient";
import {getCategories} from "@/actions/categories";
import {getProducts} from "@/actions/products";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import {getCurrentUser} from "@/lib/auth/get_curret_user";

export default async function market(){
    const currentUser = await getCurrentUser();
    const categories = await getCategories();
    const products = await getProducts();
    return (
        <>
            <main className="bg-background text-on-surface">
                <Header />
                <Menu currentUser={currentUser} />
                {currentUser && (
                    <Market categories={categories} products={products} currentUser={currentUser}/>
                )}
            </main >
        </>
    )
}