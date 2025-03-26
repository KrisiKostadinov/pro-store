"use server";

import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";

import { prisma } from "@/db/prisma";

export async function getLatestProducts(
  take: number = LATEST_PRODUCTS_LIMIT,
  order: "asc" | "desc" = "desc"
) {
  const products = await prisma.product.findMany({
    take: take,
    orderBy: {
      createdAt: order,
    },
  });

  return products;
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: {
      slug: slug,
    },
  });

  return product;
}
