import { Product } from "@prisma/client";
import ProductCard from "@/components/shared/product/product-card";

type Props = {
  title: string;
  products: Product[];
  limit?: number;
};

export default function ProductList({ title, products, limit = 10 }: Props) {
  const limitedData = products.slice(0, limit);

  return (
    <div className="container mx-auto py-5 max-sm:px-5">
      <h2 className="text-3xl font-semibold mb-5">{title}</h2>
      {limitedData.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          Няма намерени продукти.
        </div>
      )}
    </div>
  );
}
