import { Metadata } from "next";

import { getMyCart } from "@/lib/actions/cart.actions";
import CartTable from "@/app/(root)/cart/components/cart-table";
import ProceedToShippingAddress from "@/app/(root)/cart/components/proceed-to-shipping-address";

export const metadata: Metadata = {
  title: "Количка",
};

export default async function CartPage() {
  const cart = await getMyCart();

  return (
    <div className="container mx-auto">
      <div className="mt-10 flex gap-5">
        <div className="flex-1">
          <h1 className="mb-5 text-2xl text-center font-semibold">Количка</h1>
          <CartTable cart={cart} />
        </div>
        {cart && cart.items.length > 0 && (
          <div className="min-w-xs">
            <ProceedToShippingAddress cart={cart} />
          </div>
        )}
      </div>
    </div>
  );
}
