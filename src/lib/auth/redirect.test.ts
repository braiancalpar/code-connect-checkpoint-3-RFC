import { describe, expect, it } from "vitest";
import { getSafeReturnTo } from "./redirect";

describe("destino após autenticação", () => {
  it("mantém caminhos internos com query string", () => {
    expect(getSafeReturnTo("/publicar?rascunho=1")).toBe(
      "/publicar?rascunho=1",
    );
  });

  it("rejeita destinos externos", () => {
    expect(getSafeReturnTo("https://exemplo.com")).toBe("/");
    expect(getSafeReturnTo("//exemplo.com")).toBe("/");
    expect(getSafeReturnTo("/\\exemplo.com")).toBe("/");
  });
});
