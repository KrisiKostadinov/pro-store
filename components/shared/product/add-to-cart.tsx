"use client";

import { addToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import {
  showErrorToast,
  showToast,
} from "@/components/shared/helpers/client-helpers";

type Props = {
  item: CartItem;
};

export default function AddToCart({ item }: Props) {
  const handleAddToCart = async () => {
    const response = await addToCart(item);

    if (!response.success) {
      showErrorToast(
        "Грешка при добавянето!",
        "Не можете да добавите повече, тъй като наличността е ограничена.",
      );
      return;
    }

    if (response.success) {
      showToast(
        response.message,
        "Прегледайте количката, за да завършите покупката.",
        "/cart",
        "Преглед"
      );
    }
  };

  return (
    <button
      className="bg-destructive hover:bg-destructive/60 text-white md:text-lg py-3 rounded cursor-pointer"
      onClick={handleAddToCart}
    >
      Добави в количката
    </button>
  );
}