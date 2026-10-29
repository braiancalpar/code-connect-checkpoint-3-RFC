// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => {
  class BackendError extends Error {
    constructor(
      message: string,
      public readonly status: number,
    ) {
      super(message);
    }
  }

  return {
    BackendError,
    backendFetch: vi.fn(),
    cookies: vi.fn(),
  };
});

vi.mock("server-only", () => ({}));
vi.mock("next/headers", () => ({ cookies: mocks.cookies }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));
vi.mock("@/lib/api/backend", () => ({
  BackendError: mocks.BackendError,
  backendFetch: mocks.backendFetch,
  normalizeUser: (user: unknown) => user,
}));

import { getCurrentUser } from "./session";

beforeEach(() => {
  vi.clearAllMocks();
  mocks.cookies.mockResolvedValue({
    get: () => ({ value: "jwt-da-sessao" }),
  });
});

describe("sessão server-side", () => {
  it("trata uma resposta 401 como sessão inválida", async () => {
    mocks.backendFetch.mockRejectedValue(
      new mocks.BackendError("Token inválido", 401),
    );

    await expect(getCurrentUser()).resolves.toBeNull();
  });

  it("propaga indisponibilidade do backend para o error boundary", async () => {
    mocks.backendFetch.mockRejectedValue(new Error("Backend indisponível"));

    await expect(getCurrentUser()).rejects.toThrow("Backend indisponível");
  });
});
