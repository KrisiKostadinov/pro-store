"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRightIcon, Loader } from "lucide-react";

import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants";
import { PaymentMethods, paymentMethodSchema } from "@/lib/validators";
import { PaymentMethod } from "@/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateUserPaymentMethod } from "@/lib/actions/user.actions";
import { showErrorToast } from "@/components/shared/helpers/client-helpers";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

type Props = {
  prefferedPaymentMethod: PaymentMethods;
};

export default function PaymentMethodForm({ prefferedPaymentMethod }: Props) {
  const router = useRouter();

  const form = useForm<PaymentMethod>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: prefferedPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: PaymentMethod) {
    startTransition(async () => {
      const response = await updateUserPaymentMethod(values);

      if (!response.success) {
        showErrorToast("Грешка при промяната!", response.message);
        return;
      }

      router.push("/place-order");
    });
  }

  return (
    <Form {...form}>
      <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10 border rounded-md shadow p-5">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  Метод на плащане <span className="text-destructive">*</span>
                </FormLabel>
                <FormDescription>
                  Изберете предпочитания от вас метод на плащане.
                </FormDescription>
                <Separator className="my-5" />
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-2"
                  >
                    {Object.entries(PaymentMethods).map(([key, value]) => (
                      <FormItem
                        key={key}
                        className="flex items-center space-x-3"
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={key}
                            checked={field.value === key}
                          />
                        </FormControl>
                        <FormLabel className="text-lg">
                          {value}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            className="bg-destructive hover:bg-destructive/60 disabled:bg-destructive/60 text-white md:text-lg py-3 rounded cursor-pointer"
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
                    <span>Продължаване</span>
                  </>
                )}
              </span>
            </div>
          </button>
        </div>
      </form>
    </Form>
  );
}
