// @vitest-environment node

import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  cookies: vi.fn(),
  revalidateTag: vi.fn(),
}));

vi.mock("next/headers", () => ({ cookies: mocks.cookies }));
vi.mock("next/cache", () => ({ revalidateTag: mocks.revalidateTag }));

import { POST } from "./route";

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe("POST /api/posts", () => {
  it("deve recusar a publicação quando não existe sessão", async () => {
    mocks.cookies.mockResolvedValue({ get: () => undefined });
    const backendFetch = vi.fn();
    vi.stubGlobal("fetch", backendFetch);

    const response = await POST(
      new Request("http://localhost:3001/api/posts", { method: "POST" }),
    );

    expect(response.status).toBe(401);
    expect(backendFetch).not.toHaveBeenCalled();
  });

  it("deve responder com sucesso e invalidar o feed quando a API confirma a publicação", async () => {
    mocks.cookies.mockResolvedValue({
      get: () => ({ value: "jwt-do-cookie" }),
    });
    const backendFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: 10, slug: "novo-projeto" }), {
        status: 201,
        headers: { "content-type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", backendFetch);

    const formData = new FormData();
    formData.set("title", "Novo projeto");

    const response = await POST(
      new Request("http://localhost:3001/api/posts", {
        method: "POST",
        body: formData,
      }),
    );

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ id: 10, slug: "novo-projeto" });
    expect(backendFetch).toHaveBeenCalledOnce();
    expect(backendFetch.mock.calls[0][0]).toMatch(/\/blog-posts$/);
    expect(backendFetch.mock.calls[0][1]).toMatchObject({
      method: "POST",
      headers: { Authorization: "Bearer jwt-do-cookie" },
    });
    expect(mocks.revalidateTag).toHaveBeenCalledWith("posts");
  });
});
