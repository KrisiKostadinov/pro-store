import { z } from "zod";

import { insertProductSchema } from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema>;

export interface FormResponse {
  success: boolean;
  message?: string;
  messages?: string[];
  values?: Record<string, any>;
}