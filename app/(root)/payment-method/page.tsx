import { Metadata } from "next";

import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";
import { Separator } from "@/components/ui/separator";
import PaymentMethodForm from "@/app/(root)/payment-method/components/payment-method-form";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { PaymentMethods } from "@/lib/validators";

export const metadata: Metadata = {
  title: "Метод на плащане",
  description: "Изберете предпочитания от вас метод на плащане.",
};

export default async function PaymentMethodPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("Този потребител не е намерен.");

  const user = await getUserById(userId);

  return (
    <div className="space-y-5">
      <CheckoutSteps current={2} />
      <Separator className="mb-0" />
      <div className="container mx-auto">
        <h1 className="container mx-auto text-2xl font-semibold mt-5">
          Метод на плащане
        </h1>
        <p className="text-muted-foreground">
            Изберете предпочитания от вас метод на плащане.
        </p>
      </div>
      <Separator className="mb-0" />
      <div className="container mx-auto py-10">
        <PaymentMethodForm prefferedPaymentMethod={user.paymentMethod as PaymentMethods} />
      </div>
    </div>
  );
}
