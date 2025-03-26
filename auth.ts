import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";

import { prisma } from "@/db/prisma";
import { signInFormSchema } from "./lib/validators";

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
          return { id: user.id, email: user.email, role: user.role };
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
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});
