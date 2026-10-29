import { headers } from "next/headers";
import { requireCurrentUser } from "@/lib/auth/session";
import { RETURN_TO_HEADER } from "@/lib/auth/constants";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  await requireCurrentUser(requestHeaders.get(RETURN_TO_HEADER) ?? "/");
  return children;
}
