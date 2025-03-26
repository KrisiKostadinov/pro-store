"use client";

import { useState } from "react";
import Image from "next/image";

import { Product } from "@prisma/client";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
};

export default function ImagesSection({ product }: Props) {
  const [current, setCurrent] = useState(0);

  const images = JSON.parse(product.images as string) || [];

  return (
    <div className="mt-5 space-y-4">
      <div className="border-4 border-gray-100 rounded-md overflow-hidden">
        <Image
          src={images[current]}
          alt={product.name}
          width={1000}
          height={1000}
          decoding="async"
          className="min-h-[300px] object-cover object-center"
        />
      </div>
      <div className="flex gap-2">
        {images.map((image: string, index: number) => (
          <Image
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            width={100}
            height={100}
            onClick={() => setCurrent(index)}
            className={cn(
              "border-4 border-gray-100 rounded-md overflow-hidden cursor-pointer",
              current === index && "border-destructive/20"
            )}
          />
        ))}
      </div>
    </div>
  );
}
