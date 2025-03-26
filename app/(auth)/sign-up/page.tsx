import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { APP_NAME } from "@/lib/constants";
import CredentialsSignUpForm from "@/app/(auth)/sign-up/components/credentials-sign-up-form";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Нов потребител",
};

type Props = {
  searchParams: Promise<{ callbackUrl: string }>;
};

export default async function SignUpPage({ searchParams }: Props) {
  const { callbackUrl } = await searchParams;

  const session = await auth();

  if (session) {
    redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="border shadow rounded-md p-5 space-y-5">
        <Link href={"/"} className="flex justify-center">
          <Image
            src={"/logo.png"}
            width={100}
            height={100}
            alt={`${APP_NAME} logo`}
            priority
          />
        </Link>
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Създаване на нов профил</h1>
            <p className="text-muted-foreground">
                Въведете следните полета, за да създадете своя профил.
            </p>
          </div>
          <CredentialsSignUpForm />
        </div>
      </div>
    </div>
  );
}
