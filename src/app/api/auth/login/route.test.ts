// @vitest-environment node

import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("POST /api/auth/login", () => {
  it("guarda o token em cookie HttpOnly sem expô-lo no corpo", async () => {
    const backendFetch = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          access_token: "jwt-secreto",
          user: {
            id: "user-1",
            name: "Ada",
            email: "ada@codeconnect.com",
          },
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      ),
    );
    vi.stubGlobal("fetch", backendFetch);

    const response = await POST(
      new Request("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: "ada@codeconnect.com",
          password: "123456",
          remember: true,
        }),
      }),
    );

    const body = await response.json();
    const setCookie = response.headers.get("set-cookie") ?? "";

    expect(response.status).toBe(200);
    expect(body).toEqual({
      user: {
        id: "user-1",
        name: "Ada",
        email: "ada@codeconnect.com",
      },
    });
    expect(body).not.toHaveProperty("access_token");
    expect(setCookie).toContain("codeconnect_token=jwt-secreto");
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie).toContain("SameSite=lax");
    expect(setCookie).toContain("Max-Age=604800");
  });
});
