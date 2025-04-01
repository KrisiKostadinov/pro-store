"use client";

import Link from "next/link";
import Image from "next/image";

import { Cart, CartItem } from "@/types";
import EmptyCart from "@/app/(root)/cart/components/empty-cart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader, MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { addToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import {
  showErrorToast,
  showToast,
} from "@/components/shared/helpers/client-helpers";

type Props = {
  cart: Cart | undefined;
};

export default function CartTable({ cart }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      {!cart || cart.items.length === 0 ? (
        <EmptyCart />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Пр.</TableHead>
              <TableHead>Име</TableHead>
              <TableHead>Кол.</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Общо</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.items.map((item) => (
              <TableRow key={item.slug}>
                <TableCell>
                  <Link
                    href={`/product/${item.slug}`}
                    className="flex items-center"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={120}
                      height={120}
                      decoding="async"
                      className="bg-cover rounded-md border-2 border-gray-100 dark:border-gray-900"
                    />
                  </Link>
                </TableCell>
                <TableCell className="md:text-xl">{item.name}</TableCell>
                <TableCell className="md:text-xl mt-5 flex items-center gap-2">
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    disabled={isPending}
                    onClick={() =>
                      startTransition(async () => {
                        const response = await addToCart(item);

                        if (!response.success) {
                          showErrorToast("Грешка!", response.message);
                          return;
                        }

                        showToast("Успех!", response.message);
                      })
                    }
                  >
                    {isPending ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <PlusIcon />
                    )}
                  </Button>
                  <div>{item.qty}</div>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    disabled={isPending}
                    onClick={() =>
                      startTransition(async () => {
                        const response = await removeItemFromCart(
                          item.productId
                        );

                        if (!response.success) {
                          showErrorToast("Грешка!", response.message);
                          return;
                        }

                        showToast("Успех!", response.message);
                      })
                    }
                  >
                    {isPending ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <MinusIcon />
                    )}
                  </Button>
                </TableCell>
                <TableCell className="md:text-xl">
                  {formatPrice(Number(item.price))}
                </TableCell>
                <TableCell className="md:text-xl">
                  {formatPrice(Number(item.price) * item.qty)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
