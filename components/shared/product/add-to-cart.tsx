"use client";

import { useRouter } from "next/navigation";
import { Loader, ShoppingCartIcon } from "lucide-react";
import { useTransition } from "react";

import { Cart } from "@prisma/client";
import { addToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import {
  showErrorToast,
  showToast,
} from "@/components/shared/helpers/client-helpers";

type Props = {
  item: CartItem;
  cart: Cart | undefined;
  isLoading: boolean;
};

export default function AddToCart({ cart, item, isLoading }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(async () => {
      const response = await addToCart(item);

      if (!response.success) {
        showErrorToast(
          "Грешка при добавянето!",
          "Не можете да добавите повече, тъй като наличността е ограничена."
        );
        return;
      }

      if (response.success) {
        showToast(response.message as string, "", "/cart", "Преглед");
      }
    });
  };

  const existItem = cart && (cart.items as CartItem[]).find((x) => x.productId === item.productId);

  return existItem ? (
    <button
      className="bg-destructive hover:bg-destructive/60 disabled:bg-destructive/60 text-white md:text-lg py-3 rounded cursor-pointer"
      onClick={() => router.push("/cart")}
      disabled={isLoading}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            <span>Добавяне...</span>
          </>
        ) : (
          <>
            <ShoppingCartIcon />
            <span>Към количката</span>
          </>
        )}
      </div>
    </button>
  ) : (
    <button
      className="bg-destructive hover:bg-destructive/60 disabled:bg-destructive/60 text-white md:text-lg py-3 rounded cursor-pointer"
      onClick={handleAddToCart}
      disabled={isPending}
    >
      <div className="flex items-center justify-center gap-2">
        <span className="flex items-center justify-center gap-2">
          {isPending ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span>Добавяне...</span>
            </>
          ) : (
            <>
              <ShoppingCartIcon />
              <span>Добави в количката</span>
            </>
          )}
        </span>
      </div>
    </button>
  );
}
