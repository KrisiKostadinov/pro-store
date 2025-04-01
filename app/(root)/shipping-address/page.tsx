import { Separator } from "@/components/ui/separator";

export default function ShippingAddressPage() {
  return (
    <div className="space-y-5">
      <h1 className="container mx-auto text-2xl font-semibold my-5">
        Адрес за доставка
      </h1>
      <Separator />
      <div className="container mx-auto">address</div>
    </div>
  );
}
