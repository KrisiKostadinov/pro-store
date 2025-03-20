import Image from "next/image";
import Link from "next/link";
import { MenuIcon, ShoppingCart, UserIcon } from "lucide-react";

import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/shared/header/theme-toggle";

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto flex items-center justify-between py-3 px-5 md:px-0">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt={APP_NAME}
              width={140}
              height={80}
              priority={true}
            />
          </Link>
        </div>

        <Button
          asChild
          className="block md:hidden"
          variant={"ghost"}
          size={"icon"}
        >
          <MenuIcon className="w-12 h-12 p-3 cursor-pointer" />
        </Button>

        <div className="hidden md:block space-x-2">
          <Button asChild size={"lg"}>
            <Link href={"/sign-in"}>
              <UserIcon />
              <span>Вход</span>
            </Link>
          </Button>
          <Button asChild variant={"ghost"} size={"lg"}>
            <Link href={"/cart"}>
              <ShoppingCart />
              <span>Количка</span>
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}