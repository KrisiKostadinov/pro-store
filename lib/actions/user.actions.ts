"use server";

import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";

import { signInFormSchema, signUpFormSchema } from "@/lib/validators";
import { signIn, signOut } from "@/auth";
import { handleError } from "@/lib/utils";
import { FormResponse } from "@/types";

export async function signInWithCredentials(
  _prevState: unknown,
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
    return handleError(error, values, "Имейл адресът или паролата са невалидни.") as FormResponse;
  }
}

export async function signUpUser(_prevState: unknown, formData: FormData) {
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
    return handleError(error, values, "Имейл адресът е зает.") as FormResponse;
  }
}

export async function signOutUser() {
  await signOut();
}
