"use client";

import { useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValues } from "@/lib/constants";
import { signInWithCredentials } from "@/lib/actions/user.actions";

export default function CredentialsSignInForm() {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [formValues, setFormValues] = useState(signInDefaultValues);

  useEffect(() => {
    if (data && !data.success && data.values) {
      setFormValues(data.values as typeof signInDefaultValues);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        type="submit"
        variant={"destructive"}
        size={"lg"}
        disabled={pending}
        className="cursor-pointer w-full"
      >
        <LogInIcon />
        <span>{pending ? "Влизане..." : "Влизане"}</span>
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" value={callbackUrl} />

      <div className="space-y-5">
        <div className="space-y-1">
          <Label htmlFor="email">Имейл</Label>
          <Input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="email"
            defaultValue={formValues.email}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Парола</Label>
          <Input
            type="password"
            name="password"
            id="password"
            required
            autoComplete="password"
            defaultValue={signInDefaultValues.password}
          />
        </div>

        {data && !data.success && (
          <div className="text-destructive text-lg">{data.message}</div>
        )}
        {data && !data.success && data.messages?.length && (
          <ul className="text-destructive ml-5 list-disc">
            {data.messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        )}

        <div>
          <SignInButton />
        </div>

        <Link href={"/sign-up"} className="flex justify-center">
          <Button variant={"link"} className="cursor-pointer">
            Създаване на профил
          </Button>
        </Link>
      </div>
    </form>
  );
}
