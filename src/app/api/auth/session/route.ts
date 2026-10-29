import {
  proxyBackendResponse,
  getRouteToken,
  unauthorizedResponse,
} from "@/lib/api/route-helpers";
import { SESSION_COOKIE } from "@/lib/auth/constants";
export async function GET() {
  const token = await getRouteToken();
  if (!token) return unauthorizedResponse();
  const response = await proxyBackendResponse("auth/me", {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  if (response.status === 401) response.cookies.delete(SESSION_COOKIE);
  return response;
}
