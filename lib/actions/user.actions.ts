"use server";

import { signInFormSchema } from "@/lib/validators";
import { signIn, signOut } from "@/auth";

import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    await signIn("credentials", user);
    return { success: true, message: "Успешно влизане!" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Невалидни са имейл адрес или парола." };
  }
}

export async function signOutUser() {
  await signOut();
}
