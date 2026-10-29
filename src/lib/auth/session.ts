import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BackendError, backendFetch, normalizeUser } from "@/lib/api/backend";
import { SESSION_COOKIE } from "@/lib/auth/constants";
import { getSafeReturnTo } from "@/lib/auth/redirect";
import type { User } from "@/types";

export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export async function getCurrentUser(): Promise<User | null> {
  const token = await getSessionToken();
  if (!token) return null;

  try {
    const user = await backendFetch<User>("auth/me", {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    });
    return normalizeUser(user);
  } catch (error) {
    if (error instanceof BackendError && error.status === 401) return null;
    throw error;
  }
}

export async function requireCurrentUser(returnTo = "/"): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    const safeReturnTo = getSafeReturnTo(returnTo);
    redirect(`/auth/login?next=${encodeURIComponent(safeReturnTo)}`);
  }
  return user;
}
