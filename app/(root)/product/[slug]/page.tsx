import { notFound } from "next/navigation";

import { getProductBySlug } from "@/lib/actions/product.actions";
import PriceSection from "@/app/(root)/product/[slug]/components/price-section";
import MiddleSection from "@/app/(root)/product/[slug]/components/middle-section";
import ImagesSection from "@/app/(root)/product/[slug]/components/images-section";

export default async function ProductDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <section>
      <div className="grid md:grid-cols-5 px-5">
        <div className="col-span-2">
          <ImagesSection product={product} />
        </div>
        <div className="col-span-2 p-5">
          <MiddleSection product={product} />
        </div>
        <div className="col-span-1">
          <PriceSection product={product} />
        </div>
      </div>
    </section>
  );
}
