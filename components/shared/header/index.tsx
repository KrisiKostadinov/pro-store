import Image from "next/image";
import Link from "next/link";

import { APP_NAME } from "@/lib/constants";
import Menu from "@/components/shared/header/menu";

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto flex items-center justify-between py-3 pl-5 md:px-0">
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

        <div className="space-x-2">
          <Menu />
        </div>
      </div>
    </header>
  );
}