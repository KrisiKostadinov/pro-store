"use client";

import { Session } from "next-auth";
import { useState } from "react";
import Link from "next/link";
import {
  MenuIcon,
  SeparatorHorizontal,
  ShoppingCart,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/shared/header/theme-toggle";
import UserButton from "@/components/shared/header/user-button";

type Props = {
  session: Session | null;
}

export default function Menu({ session }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex md:items-center w-full max-w-xs gap-1">
        <UserButton session={session} />
        <Button asChild variant={"ghost"} size={"lg"}>
          <Link href={"/cart"}>
            <ShoppingCart />
            <span>Количка</span>
          </Link>
        </Button>
        <ModeToggle />
      </nav>

      <Button
        asChild
        className="block md:hidden"
        variant={"ghost"}
        size={"icon"}
        onClick={() => setOpen(!open)}
      >
        <MenuIcon className="w-12 h-12 p-3 cursor-pointer" />
      </Button>

      <nav className="md:hidden">
        <div
          className={cn(
            "fixed top-0 left-0 w-full min-h-screen bg-black/40 duration-300",
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
          onClick={() => setOpen(!open)}
        />
        <div
          className={cn(
            "fixed top-0 right-0 w-3/4 min-h-screen bg-white p-2 z-40 border-l border-gray-100 duration-300",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="text-xl">Меню</div>
          <SeparatorHorizontal />
        </div>
      </nav>
    </div>
  );
}
