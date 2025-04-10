import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";

import { prisma } from "@/db/prisma";
import { signInFormSchema } from "@/lib/validators";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedValues = signInFormSchema.safeParse(credentials);

        if (!validatedValues.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          return null;
        }

        if (compareSync(credentials.password as string, user.password)) {
          return { id: user.id, name: user.name, email: user.email, role: user.role };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  callbacks: {
    async session({ session, user, token, trigger }) {
      session.user.id = token.sub ?? "";
      session.user.role = token.role;
      session.user.name = token.name;

      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
        token.image = user.image;

        if (!user.name) {
          token.name = user.email!.split("@")[0];

          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }

      if (trigger === "signIn" || trigger === "signUp") {
        const sessionCartId = (await cookies()).get("session-cart-id")?.value;

        if (sessionCartId) {
          const sessionCart = await prisma.cart.findFirst({
            where: { sessionCartId: sessionCartId },
          });

          if (sessionCart) {
            await prisma.cart.deleteMany({
              where: { userId: user.id, NOT: { id: sessionCart.id } },
            });

            await prisma.cart.updateMany({
              where: { id: sessionCart.id },
              data: { userId: user.id },
            });
          }
        }
      }

      return token;
    },
  },
});