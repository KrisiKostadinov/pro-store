import { sampleProductsData } from "@/lib/data";
import { prisma } from "@/db/prisma";

async function main() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: sampleProductsData });
  console.log("Seeded sample products data");
}

main();