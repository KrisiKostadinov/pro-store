"use client";

import { useTransition } from "react";
import { ArrowRightIcon, GlobeIcon, Loader } from "lucide-react";
import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Cart } from "@/types";

type Props = {
  cart: Cart;
};

export default function ProceedToShippingAddress({ cart }: Props) {
  const [isPending, startTransaction] = useTransition();
  const router = useRouter();

  function handleProceedToCheckout() {
    startTransaction(async () => {
      router.push("/shipping-address");
    });
  }

  return (
    <div className="w-full min-h-40 border rounded-md p-5 space-y-5">
      <div className="text-xl">
        Продукти ({cart.items.reduce((a, c) => a + c.qty, 0)})
      </div>
      <Separator />
      <div className="flex flex-col">
        <span>Междинна сума:</span>
        <span className="text-xl">{formatPrice(Number(cart.itemsPrice))}</span>
      </div>
      <Separator />
      {cart.shippingPrice && Number(cart.shippingPrice) > 0 && (
        <>
          <div className="flex flex-col">
            <span>Цена за доставка:</span>
            <span className="text-xl">
              {formatPrice(Number(cart.shippingPrice))}
            </span>
          </div>
          <Separator />
        </>
      )}
      {cart.taxPrice && Number(cart.taxPrice) && (
        <>
          <div className="flex flex-col">
            <span>ДДС:</span>
            <span className="text-xl">{formatPrice(Number(cart.taxPrice))}</span>
          </div>
          <Separator />
        </>
      )}
      <div className="flex flex-col">
        <span>Крайна сума:</span>
        <span className="text-xl">{formatPrice(Number(cart.totalPrice))}</span>
      </div>
      <button
        className="bg-destructive hover:bg-destructive/60 disabled:bg-destructive/60 text-white md:text-lg py-3 rounded cursor-pointer w-full"
        onClick={handleProceedToCheckout}
        disabled={isPending}
      >
        <div className="flex items-center justify-center gap-2">
          <span className="flex items-center justify-center gap-2">
            {isPending ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Зареждане...</span>
              </>
            ) : (
              <>
                <ArrowRightIcon />
                <span>Адрес за доставка</span>
              </>
            )}
          </span>
        </div>
      </button>
    </div>
  );
}
