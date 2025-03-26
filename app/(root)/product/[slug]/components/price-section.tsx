"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import ProductPrice from "@/components/shared/product/product-price";

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
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

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
      <button className="bg-destructive hover:bg-destructive/60 text-white md:text-lg py-3 rounded cursor-pointer">
        Добави в количката
      </button>
    </div>
  );
}