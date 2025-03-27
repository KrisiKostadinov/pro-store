import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

const adminRoutes = ["/dashboard"];
const userRoutes = ["/profile"];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const currentRoute = request.nextUrl.pathname;

  const isAdminRoute = adminRoutes.includes(currentRoute);
  const isUserRoute = userRoutes.includes(currentRoute);

  if (!session && isAdminRoute) {
    return NextResponse.redirect(
      new URL(`/sign-in?callbackUrl=${currentRoute}`, request.url)
    );
  }

  if (!session && isUserRoute) {
    return NextResponse.redirect(
      new URL(`/sign-in?callbackUrl=${currentRoute}`, request.url)
    );
  }

  if (session && session.user && session.user.role !== "ADMIN" && isAdminRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const sessionCartId = request.cookies.get("sessionCartId");

  if (!sessionCartId) {
    const newSessionCartId = crypto.randomUUID();
    const response = NextResponse.next();
    response.cookies.set("sessionCartId", newSessionCartId);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
