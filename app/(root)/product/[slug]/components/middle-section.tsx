import { Product } from "@prisma/client";

type Props = {
  product: Product;
};

export default function MiddleSection({ product }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <p>Арт.№ 0331845</p>
      <div>{`${product.stock} ${product.stock === 1 ? "брой" : "броя"}`}</div>
      <p>{product.shortDescription}</p>
    </div>
  );
}
