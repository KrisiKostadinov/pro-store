"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { UserIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

type Props = {
  session: Session | null;
};

export default function UserButtonClient({ session }: Props) {
  if (!session) {
    return (
      <Button asChild size={"lg"}>
        <Link href={"/sign-in"}>
          <UserIcon />
          <span>Вход</span>
        </Link>
      </Button>
    );
  }

  const firstInitial = session.user?.name?.charAt(0)?.toUpperCase() ?? "U";

  const onSignOut = () => {
    signOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="relative w-8 h-8 rounded-full ml-2 flex justify-center items-center bg-gray-200 cursor-pointer"
        >
          {firstInitial}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex flex-col space-y-1">
          <DropdownMenuLabel>
            <div className="text-sm leading-none">{session.user?.name}</div>
            <div className="text-sm text-muted-foreground">
              {session.user?.email}
            </div>
          </DropdownMenuLabel>
          <Separator />
          <DropdownMenuLabel>
            <Button
              className="w-full bg-gray-100 hover:text-white hover:bg-destructive cursor-pointer"
              variant={"ghost"}
              onClick={onSignOut}
            >
              Изход
            </Button>
          </DropdownMenuLabel>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}