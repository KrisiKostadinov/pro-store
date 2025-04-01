import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-muted-foreground">
        Нямате продукти в количката.
      </div>
      <Separator className="my-10" />
      <Button variant={"destructive"} size={"lg"}>
        <Link href={"/"}>Към магазина</Link>
      </Button>
    </div>
  );
}
