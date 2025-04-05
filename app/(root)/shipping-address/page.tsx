import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { ShippingAddress } from "@/types";
import { Separator } from "@/components/ui/separator";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import ShippingAddressForm from "@/app/(root)/shipping-address/components/shipping-address-form";
import CheckoutSteps from "@/components/shared/checkout-steps";

export default async function ShippingAddressPage() {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect("/cart");

  const session = await auth();

  const userid = session?.user?.id;
  if (!userid) redirect("/sign-in?callbackUrl=/shipping-address");

  const user = await getUserById(userid);

  return (
    <div className="space-y-5">
      <CheckoutSteps current={1} />
      <Separator className="mb-0" />
      <div className="container mx-auto">
        <h1 className="container mx-auto text-2xl font-semibold mt-5">
          Адрес за доставка
        </h1>
        <p className="text-muted-foreground">
          Въведете адрес, на който да бъде доставена пратката Ви.
        </p>
      </div>
      <Separator className="mb-0" />
      <div className="container mx-auto py-10">
        <ShippingAddressForm address={user.address as ShippingAddress} />
      </div>
    </div>
  );
}
