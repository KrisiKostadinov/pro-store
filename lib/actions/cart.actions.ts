"use server";

import { cookies } from "next/headers";

import { prisma } from "@/db/prisma";
import { handleError, round2 } from "@/lib/utils";
import { CartItem, FormResponse } from "@/types";
import { cartItemSchema, insertCartSchema } from "@/lib/validators";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const TAX_PRICE = Number(process.env.TAX_PRICE) || 0.20;

const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0));
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 100);
  const taxPrice = round2(TAX_PRICE * itemsPrice);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: totalPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
}

export async function addToCart(values: CartItem) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Сесията на количката не е намерена.");

    const session = await auth();
    const userId = session && session.user && session.user.id ? (session.user.id as string) : undefined;

    const cart = await getMyCart();
    const item = await cartItemSchema.parse(values);

    const product = await prisma.product.findFirst({
      where: { id: values.productId }
    });
    if (!product) throw new Error("Този продукт не е намерен.");

    if (!cart) {
      const newCart = insertCartSchema.parse({
        userId: userId ?? undefined,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });
      await prisma.cart.create({
        data: {
          userId: userId ?? null,
          items: [item],
          sessionCartId: sessionCartId,
          ...calcPrice([item]),
        },
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: "Добавено в количката!",
      };
    } else {
      
    }
  } catch (error) {
    return handleError(error, values) as FormResponse;
  }
}

export async function getMyCart() {
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Сесията на количката не е намерена.");

  const session = await auth();
  const userId = session && session.user && session.user.id ? (session.user.id as string) : undefined;
    
  const cart = await prisma.cart.findFirst({
    where: {
      sessionCartId: sessionCartId,
      userId: userId,
    }
  });

  if (!cart) return undefined;
  return {
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  }
}
