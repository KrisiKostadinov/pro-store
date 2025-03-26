import { z } from "zod";

export const insertProductSchema = z.object({
  name: z.string().min(3, { message: "Името на продукта трябва да съдържа поне 3 синвола." }),
  slug: z.string().min(3, { message: "URL адресът на продукта трябва да съдържа поне 3 синвола." }),
  shortDescription: z.string().min(3, { message: "Краткото описание на продукта трябва да съдържа поне 3 синвола." }),
  description: z.string().min(3, { message: "Описанието на продукта трябва да съдържа поне 3 синвола." }),
  originalPrice: z.number().int().positive({ message: "Цената на продукта трябва да бъде положително число." }),
  isOnSale: z.boolean(),
  salePrice: z.number().int().positive({ message: "Цената на промоция на продукта трябва да бъде положително число." }).optional(),
  stock: z.number().int().positive({ message: "Наличността на продукта трябва да бъде положително число." }),
  images: z.array(z.string()).min(1, { message: "Трябва да качите поне една снимка на продукта." }),
  isFeatured: z.boolean(),
});