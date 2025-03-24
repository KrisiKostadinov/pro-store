import { prisma } from "@/db/prisma";
import ProductList from "@/components/shared/product/product-list";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <>
      <h1 className="min-h-[400px] bg-gray-50 dark:bg-gray-900 flex justify-center items-center text-6xl font-semibold p-5">
        MISSISROSE.COM
      </h1>

      <ProductList title="Най-нови продукти" products={products} limit={10} />
    </>
  );
}
