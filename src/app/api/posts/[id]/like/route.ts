import { revalidateTag } from "next/cache";
import {
  getRouteToken,
  proxyBackendResponse,
  unauthorizedResponse,
} from "@/lib/api/route-helpers";
import { POSTS_CACHE_TAG } from "@/lib/api/cache";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = await getRouteToken();
  if (!token) return unauthorizedResponse();
  const { id } = await params;
  const response = await proxyBackendResponse(
    `blog-posts/${encodeURIComponent(id)}/like`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    },
  );
  if (response.ok) revalidateTag(POSTS_CACHE_TAG);
  return response;
}
