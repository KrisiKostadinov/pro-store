"use client";

import { useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValues } from "@/lib/constants";
import { signUpUser } from "@/lib/actions/user.actions";

export default function CredentialsSignUpForm() {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [formValues, setFormValues] = useState(signUpDefaultValues);

  useEffect(() => {
    if (data && !data.success && data.values) {
      setFormValues(data.values);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const SignUpButton = () => {
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
        <span>{pending ? "Създаване..." : "Създаване"}</span>
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" value={callbackUrl} />

      <div className="space-y-5">
        <div className="space-y-1">
          <Label htmlFor="name">Име и фамилия</Label>
          <Input
            type="text"
            name="name"
            id="name"
            required
            autoComplete="name"
            defaultValue={formValues.name}
            onChange={handleChange}
          />
        </div>
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
            defaultValue={signUpDefaultValues.password}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="confirmPassword">Потвърдете паролата</Label>
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            autoComplete="confirmPassword"
            defaultValue={signUpDefaultValues.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {data && !data.success && data.message && (
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
          <SignUpButton />
        </div>

        <Link href={"/sign-in"} className="flex justify-center">
          <Button variant={"link"} className="cursor-pointer">
            Влизане в профила
          </Button>
        </Link>
      </div>
    </form>
  );
}
