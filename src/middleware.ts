import { NextRequest, NextResponse } from "next/server";
import { isProtectedPath } from "@/lib/auth/access";
import { RETURN_TO_HEADER, SESSION_COOKIE } from "@/lib/auth/constants";
import { getSafeReturnTo } from "@/lib/auth/redirect";

export function middleware(request: NextRequest) {
  if (!isProtectedPath(request.nextUrl.pathname)) return NextResponse.next();

  const returnTo = getSafeReturnTo(
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(RETURN_TO_HEADER, returnTo);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const loginUrl = new URL("/auth/login", request.url);
  loginUrl.searchParams.set("next", returnTo);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/publicar/:path*", "/perfil/:path*", "/rascunhos/:path*"],
};
