"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon, Loader } from "lucide-react";

import { ShippingAddress } from "@/types";
import { shippingAddressSchema } from "@/lib/validators";
import { shippingAddressDefaultValues } from "@/lib/constants";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserAddress } from "@/lib/actions/user.actions";
import { showErrorToast } from "@/components/shared/helpers/client-helpers";

type Props = {
  address: ShippingAddress;
};

export default function ShippingAddressForm({ address }: Props) {
  const router = useRouter();

  const form = useForm<ShippingAddress>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  });

  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: ShippingAddress) {
    startTransition(async () => {
      const response = await updateUserAddress(values);

      if (!response.success) {
        showErrorToast("Грешка при промяната!", response.message);
        return;
      }

      router.push("/payment-method");
    });
  }

  return (
    <Form {...form}>
      <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10 border rounded-md shadow p-5">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  Име и фамилия <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Въведете вашето име и фамилия, както са в личната ви карта."
                    {...field}
                    value={field.value ?? ""}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  Моля, посочете пълните си имена за коректна обработка на
                  поръчката.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  Телефон <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Въведете телефонен номер за потвърждение."
                    {...field}
                    value={field.value ?? ""}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  Ще се свържем с Вас, след като завършите поръчката си за
                  потвърждение.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  Точен адрес за доставка{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Въведете улица, номер, блок, вход, апартамент и допълнителни указания."
                    {...field}
                    value={field.value ?? ""}
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  Добавете всички необходими детайли, за да улесните куриера при
                  доставката.
                </FormDescription>
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
