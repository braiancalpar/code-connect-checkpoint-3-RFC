import { revalidateTag } from "next/cache";
import {
  getRouteToken,
  proxyBackendResponse,
  unauthorizedResponse,
} from "@/lib/api/route-helpers";
import { POSTS_CACHE_TAG } from "@/lib/api/cache";
async function authorized(
  method: "PATCH" | "DELETE",
  request: Request,
  params: Promise<{ id: string }>,
) {
  const token = await getRouteToken();
  if (!token) return unauthorizedResponse();
  const { id } = await params;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
  const init: RequestInit = { method, headers };
  if (method === "PATCH") {
    headers["Content-Type"] = "application/json";
    init.body = await request.text();
  }
  const response = await proxyBackendResponse(
    `comments/${encodeURIComponent(id)}`,
    init,
  );
  if (response.ok) revalidateTag(POSTS_CACHE_TAG);
  return response;
}
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  return authorized("PATCH", request, context.params);
}
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  return authorized("DELETE", request, context.params);
}
