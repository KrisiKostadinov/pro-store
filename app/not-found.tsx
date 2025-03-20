"use client";

import Image from "next/image";

import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src={"/logo.png"}
        alt={`${APP_NAME} logo`}
        width={300}
        height={100}
        priority={true}
      />
      <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">404</h1>
        <p className="text-destructive">
          Исканата страница не можа да бъде намерена.
        </p>
        <Button
          className="mt-4 ml-2"
          variant={"outline"}
          onClick={() => (window.location.href = "/")}
        >
            Към началната страница
        </Button>
      </div>
    </div>
  );
}
