import { revalidateTag } from "next/cache";
import {
  getRouteToken,
  proxyBackendResponse,
  unauthorizedResponse,
} from "@/lib/api/route-helpers";
import { POSTS_CACHE_TAG } from "@/lib/api/cache";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const token = await getRouteToken();
  if (!token) return unauthorizedResponse();
  const { postId } = await params;
  const body = await request.text();
  const response = await proxyBackendResponse(
    `comments/post/${encodeURIComponent(postId)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    },
  );
  if (response.ok) revalidateTag(POSTS_CACHE_TAG);
  return response;
}
