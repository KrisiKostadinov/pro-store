import { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

type Props = {
  product: Product;
  className?: string;
};

export default function ProductPrice({ product, className }: Props) {
  return (
    <>
      {product.salePrice ? (
        <div className={className}>
          <div className="text-xl text-destructive">
            {formatPrice(product.salePrice)}
          </div>
          <div className="line-through text-muted-foreground">
            {formatPrice(product.originalPrice)}
          </div>
        </div>
      ) : (
        <div className="text-xl">{formatPrice(product.originalPrice)}</div>
      )}
    </>
  );
}
