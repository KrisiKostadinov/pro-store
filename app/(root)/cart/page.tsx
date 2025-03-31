import { Metadata } from "next";

import { getMyCart } from "@/lib/actions/cart.actions";
import CartTable from "@/app/(root)/cart/components/cart-table";

export const metadata: Metadata = {
  title: "Количка",
};

export default async function CartPage() {
  const cart = await getMyCart();

  return (
    <div>
      <h1 className="mt-10 text-2xl text-center font-semibold">Количка</h1>
      <CartTable cart={cart} />
    </div>
  );
}
