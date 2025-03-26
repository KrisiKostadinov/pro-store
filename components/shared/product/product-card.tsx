import Image from "next/image";
import Link from "next/link";

import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductPrice from "@/components/shared/product/product-price";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const images = product.images ? JSON.parse(product.images.toString()) : [];

  return (
    <div className="relative w-full h-full dark:bg-black bg-white shadow border rounded-md overflow-hidden">
      {product.salePrice && (
        <div className="absolute top-5 left-5 bg-red-500 text-white py-1 px-2 rounded z-10">
          ПРОМОЦИЯ
        </div>
      )}
      <Link
        href={`/product/${product.slug}`}
        className="h-full flex flex-col justify-between gap-5"
      >
        {images[0] && (
          <div className="h-full max-h-[240px] overflow-hidden">
            <Image
              className="h-full object-cover duration-300 hover:scale-120"
              src={images[0]}
              alt={product.name}
              width={600}
              height={400}
              decoding="async"
            />
          </div>
        )}
        <h3 className="text-lg line-clamp-2 px-5">{product.name}</h3>
        <Separator />
        <div className="flex justify-between items-center px-5 mb-5">
          <Button className="cursor-pointer" variant={"outline"}>
            Към продукта
          </Button>

          <ProductPrice product={product} />
        </div>
      </Link>
    </div>
  );
}
