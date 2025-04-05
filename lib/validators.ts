import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z.string()
  .refine((value) =>
  /^\d+(\.\d{2})?$/
  .test(formatNumberWithDecimal(Number(value))),
  { message: "Цената трябва да съдържа точно две числа след десетичната запетая." });

export const insertProductSchema = z.object({
  name: z.string().min(3, { message: "Името на продукта трябва да съдържа поне 3 синвола." }),
  slug: z.string().min(3, { message: "URL адресът на продукта трябва да съдържа поне 3 синвола." }),
  shortDescription: z.string().min(3, { message: "Краткото описание на продукта трябва да съдържа поне 3 синвола." }),
  description: z.string().min(3, { message: "Описанието на продукта трябва да съдържа поне 3 синвола." }),
  originalPrice: currency,
  isOnSale: z.boolean(),
  salePrice: currency.optional(),
  stock: z.number().int().positive({ message: "Наличността на продукта трябва да бъде положително число." }),
  images: z.array(z.string()).min(1, { message: "Трябва да качите поне една снимка на продукта." }),
  isFeatured: z.boolean(),
});

export const signInFormSchema = z.object({
  email: z.string().email({ message: "Невалиден имейл адрес." }),
  password: z.string().min(6, { message: "Паролата трябва да съдържа поне 6 символа." }),
});

export const signUpFormSchema = z.object({
  name: z.string().min(3, { message: "Името трябва да съдържа поне 3 синвола." }),
  email: z.string().email({ message: "Невалиден имейл адрес." }),
  password: z.string().min(6, { message: "Паролата трябва да съдържа поне 6 символа." }),
});

export const cartItemSchema = z.object({
  productId: z.string().min(1, { message: "Продуктът е задължителен." }),
  name: z.string().min(1, { message: "Името е задължително." }),
  slug: z.string().min(1, { message: "URL адресът е задължителен." }),
  qty: z.number().int().nonnegative({ message: "Количеството трябва да бъде положително число." }),
  image: z.string().min(1, { message: "Снимката е задължителна." }),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, { message: "session-cart-id е задължителен и не може да бъде празен." }),
  userId: z.string().optional().nullable(),
});

export const shippingAddressSchema = z.object({
  fullname: z.string({ message: "Това поле е задължително!" }).min(1, { message: "Моля, въведете името си." }),
  streetAddress: z.string({ message: "Това поле е задължително!" }).min(1, { message: "Моля, въведете адрес за доставка." }),
  phoneNumber: z.string({ message: "Това поле е задължително!" }).min(1, { message: "Моля, въведете телефон за потвърждение на пратката." }),
});

export const paymentMethods = ["PayPal", "CARD", "CASH"] as const;

export enum PaymentMethods {
  CASH = "Наложен платеж",
  CARD = "Кредитна/Дебитна карта",
  PAYPAL = "PayPal",
}

export const paymentMethodSchema = z.object({
  type: z.string().min(1, { message: "Моля, изберете метод на плащане." }),
});
