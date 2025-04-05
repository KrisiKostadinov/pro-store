"use server";

import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";

import { shippingAddressSchema, signInFormSchema, signUpFormSchema } from "@/lib/validators";
import { auth, signIn, signOut } from "@/auth";
import { handleError } from "@/lib/utils";
import { FormResponse, ShippingAddress } from "@/types";

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

export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) throw new Error("Този потребител не е намерен.");

  return user;
}

export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error("Този потребител не е намерен.");

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { address },
    });

    return { success: true, message: "Данните на профила са запазени." }
  } catch (error) {
    return handleError(error);
  }
}
