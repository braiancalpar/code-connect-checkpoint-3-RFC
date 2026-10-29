import { NextResponse } from "next/server";
import { API_URL, getErrorMessage } from "./backend";
import { SESSION_COOKIE } from "@/lib/auth/constants";
import { cookies } from "next/headers";

export async function getRouteToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { message: "Faça login para continuar." },
    { status: 401 },
  );
}

export async function proxyBackendResponse(
  path: string,
  init: RequestInit,
): Promise<NextResponse> {
  try {
    const response = await fetch(`${API_URL}/${path.replace(/^\//, "")}`, {
      ...init,
      cache: "no-store",
    });
    const contentType = response.headers.get("content-type") ?? "";
    const body = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (typeof body === "string") {
      return new NextResponse(body, {
        status: response.status,
        headers: { "content-type": contentType || "text/plain" },
      });
    }

    return NextResponse.json(body, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        message: getErrorMessage(
          error,
          "Não foi possível conectar ao backend do CodeConnect.",
        ),
      },
      { status: 502 },
    );
  }
}
