"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { ZodError } from "zod";

import { signInFormSchema, signUpFormSchema } from "@/lib/validators";
import { signIn, signOut } from "@/auth";

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  const values = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const user = signInFormSchema.parse(values);

    await signIn("credentials", user);
    return { success: true, message: "Успешно влизане!" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof ZodError) {
      const messages = error.errors.map((x) => x.message);
      return { success: false, messages, values };
    }

    return {
      success: false,
      message: "Невалидни са имейл адрес или парола.",
      values,
    };
  }
}

export async function signUpUser(prevState: unknown, formData: FormData) {
  const values = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  try {
    const user = signUpFormSchema.parse(values);

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: "Успешно създаден нов потребител." };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof ZodError) {
      const messages = error.errors.map((x) => x.message);
      return { success: false, messages, values };
    }

    return {
      success: false,
      message: "Имейл адресът е зает.",
      values,
    };
  }
}

export async function signOutUser() {
  await signOut();
}