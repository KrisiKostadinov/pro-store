"use client";

import { useState, useTransition } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Cart, Product } from "@prisma/client";
import ProductPrice from "@/components/shared/product/product-price";
import AddToCart from "@/components/shared/product/add-to-cart";
import { removeItemFromCart } from "@/lib/actions/cart.actions";
import { showErrorToast, showToast } from "@/components/shared/helpers/client-helpers";

type Props = {
  product: Product;
  cart: Cart | undefined;
};

export default function PriceSection({ cart, product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();

  const increase = () => {
    if (quantity >= product.stock) return;
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    startTransition(async () => {
      const response = await removeItemFromCart(product.id);

      if (response.success) {
        showToast(response.message as string, "", "/cart", "Преглед");
      }
    });
  };

  const productPrice = product.salePrice
    ? product.salePrice
    : product.originalPrice;
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
          disabled={isPending}
        >
          <MinusIcon />
        </Button>
      </div>
      <AddToCart
        cart={cart}
        item={{
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: productPrice.toString(),
          qty: 1,
          image: productImage,
        }}
      />
    </div>
  );
}
