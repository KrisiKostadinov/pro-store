import { z } from "zod";

export const inertProductSchema = z.object({
  name: z.string().min(3, { message: "Името на продукта трябва да съдържа поне 3 синвола." }),
});
