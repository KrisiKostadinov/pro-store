import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import { getLatestProducts } from "@/lib/actions/product.actions";
import ProductList from "@/components/shared/product/product-list";

export default async function Home() {
  const products = await getLatestProducts(LATEST_PRODUCTS_LIMIT, "desc");

  return (
    <>
      <h1 className="min-h-[400px] bg-gray-50 dark:bg-gray-900 flex justify-center items-center text-6xl font-semibold p-5">
        MISSISROSE.COM
      </h1>

      <ProductList
        title="Най-нови продукти"
        products={products}
        limit={LATEST_PRODUCTS_LIMIT}
      />
    </>
  );
}
