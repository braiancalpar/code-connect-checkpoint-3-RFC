// @vitest-environment node

import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "./middleware";

describe("middleware de acesso", () => {
  it("redireciona uma rota privada e preserva o destino", () => {
    const request = new NextRequest(
      "http://localhost:3001/publicar?origem=perfil",
    );

    const response = middleware(request);
    const location = new URL(response.headers.get("location") ?? "");

    expect(response.status).toBe(307);
    expect(location.pathname).toBe("/auth/login");
    expect(location.searchParams.get("next")).toBe("/publicar?origem=perfil");
  });

  it("mantém uma rota pública acessível", () => {
    const response = middleware(
      new NextRequest("http://localhost:3001/blog-post/react"),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });
});
