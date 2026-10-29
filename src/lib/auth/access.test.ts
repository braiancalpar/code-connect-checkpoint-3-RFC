import { describe, expect, it } from "vitest";
import { isProtectedPath } from "./access";
describe("proteção de rotas", () => {
  it("marca áreas privadas como protegidas", () => {
    expect(isProtectedPath("/publicar")).toBe(true);
    expect(isProtectedPath("/perfil/configuracoes")).toBe(true);
    expect(isProtectedPath("/rascunhos")).toBe(true);
  });
  it("mantém páginas públicas acessíveis", () => {
    expect(isProtectedPath("/")).toBe(false);
    expect(isProtectedPath("/sobre")).toBe(false);
    expect(isProtectedPath("/blog-post/react")).toBe(false);
  });
});
