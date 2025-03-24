import { sampleUsersData, sampleProductsData } from "@/lib/data";
import { prisma } from "@/db/prisma";

async function main() {
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.session.deleteMany();

  await prisma.product.deleteMany();

  await prisma.user.createMany({ data: sampleUsersData });

  await prisma.product.createMany({ data: sampleProductsData });

  console.log("Database seeded successfully");
}

main();
