import { NextResponse } from "next/server";
import { API_URL, getErrorMessage } from "@/lib/api/backend";
import { SESSION_COOKIE } from "@/lib/auth/constants";
import type { AuthResponse } from "@/types";

export async function POST(request: Request) {
  try {
    const { email, password, remember } = await request.json();
    const backendResponse = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });
    const data = await backendResponse.json();
    if (!backendResponse.ok)
      return NextResponse.json(
        { message: getErrorMessage(data, "Credenciais inválidas.") },
        { status: backendResponse.status },
      );
    const auth = data as AuthResponse;
    const response = NextResponse.json({ user: auth.user });
    response.cookies.set(SESSION_COOKIE, auth.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: remember ? 60 * 60 * 24 * 7 : undefined,
    });
    return response;
  } catch {
    return NextResponse.json(
      { message: "Não foi possível conectar ao backend." },
      { status: 502 },
    );
  }
}
