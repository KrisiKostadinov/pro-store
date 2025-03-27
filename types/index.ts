import { z } from "zod";

import {
  cartItemSchema,
  insertCartSchema,
  insertProductSchema,
} from "@/lib/validators";

export interface FormResponse {
  success: boolean;
  message?: string;
  messages?: string[];
  values?: Record<string, any>;
}

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;