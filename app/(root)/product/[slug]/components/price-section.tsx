"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import ProductPrice from "@/components/shared/product/product-price";
import AddToCart from "@/components/shared/product/add-to-cart";

type Props = {
  product: Product;
};

export default function PriceSection({ product }: Props) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    if (quantity >= product.stock) return;
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    setQuantity(quantity - 1);
  };

  const productPrice = product.salePrice ? product.salePrice : product.originalPrice;
  const productImage = JSON.parse(product.images as string)[0] || "";

  return (
    <div className="border rounded mt-5 p-5 flex flex-col gap-5">
      <ProductPrice className="flex items-center gap-5" product={product} />
      <div className="flex overflow-hidden gap-2">
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={increase}
          disabled={quantity >= product.stock}
        >
          <PlusIcon />
        </Button>
        <input
          className="border rounded-md flex-1 px-4"
          type="number"
          min={1}
          value={quantity}
          readOnly
        />
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={decrease}
          disabled={quantity === 1}
        >
          <MinusIcon />
        </Button>
      </div>
      <AddToCart item={{
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: productPrice.toString(),
        qty: 1,
        image: productImage,
      }} />
    </div>
  );
}
