import { proxyBackendResponse } from "@/lib/api/route-helpers";
export async function POST(request: Request) {
  const body = await request.text();
  return proxyBackendResponse("auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body,
  });
}
