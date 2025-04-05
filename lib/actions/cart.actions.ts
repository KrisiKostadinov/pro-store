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
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 0);
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
    const sessionCartId = (await cookies()).get("session-cart-id")?.value;
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
        userId: userId ?? null,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });
      await prisma.cart.create({
        data: newCart,
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: "Добавено в количката!",
      };
    } else {
      const existItem = (cart.items as CartItem[]).find((x) => x.productId === item.productId);
      
      if (existItem) {
        if (product.stock < existItem.qty + 1) {
          throw new Error("Няма достатъчно количество.");
        }

        (cart.items as CartItem[]).find((x) => x.productId === item.productId)!.qty = existItem.qty + 1;
      } else {
        if (product.stock < 1) throw new Error("Няма достатъчно количество.");
        cart.items.push(item);
      }
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items,
          ...calcPrice(cart.items),
        }
      });

      revalidatePath(`/product/${product.slug}`);

      const message = `${product.name} ${existItem ? "е актуализиран" : "е добавен"} в киличката.`;
      return {
        success: true,
        message: message,
      }
    }
  } catch (error) {
    return handleError(error, values) as FormResponse;
  }
}

export async function getMyCart() {
  const sessionCartId = (await cookies()).get("session-cart-id")?.value;
  if (!sessionCartId) throw new Error("Сесията на количката не е намерена.");

  const session = await auth();
  const userId = session && session.user && session.user.id ? (session.user.id as string) : undefined;
    
  const cart = await prisma.cart.findFirst({
    where: {
      OR: [
        { sessionCartId: sessionCartId },
        { userId: userId }
      ]
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

export async function removeItemFromCart(productId: string) {
  try {
    const sessionCartId = (await cookies()).get("session-cart-id")?.value;
    if (!sessionCartId) throw new Error("Сесията на количката не е намерена.");

    const product = await prisma.product.findFirst({
      where: { id: productId }
    });
    if (!product) throw new Error("Този продукт не е намерен.");

    const cart = await getMyCart();
    if (!cart) throw new Error("Количката не е намерена.");

    const exist = (cart.items as CartItem[]).find((x) => x.productId === productId);
    if (!exist) throw new Error("Този продукт не е намерен в количката.");

    if (exist.qty === 1) {
      cart.items = (cart.items as CartItem[]).filter((x) => x.productId !== productId);
    } else {
      (cart.items as CartItem[]).find((x) => x.productId === exist.productId)!.qty = exist.qty - 1;
    }

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items,
        ...calcPrice(cart.items),
      }
    });
    
    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} е изтрит от количката.`,
    }
  } catch (error) {
    console.log(error);
    return handleError(error, ) as FormResponse;
  }
}