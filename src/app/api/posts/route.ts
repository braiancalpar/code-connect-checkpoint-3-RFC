import { revalidateTag } from "next/cache";
import {
  getRouteToken,
  proxyBackendResponse,
  unauthorizedResponse,
} from "@/lib/api/route-helpers";
import { POSTS_CACHE_TAG } from "@/lib/api/cache";

export async function POST(request: Request) {
  const token = await getRouteToken();
  if (!token) return unauthorizedResponse();
  const formData = await request.formData();
  const response = await proxyBackendResponse("blog-posts", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (response.ok) revalidateTag(POSTS_CACHE_TAG);
  return response;
}
