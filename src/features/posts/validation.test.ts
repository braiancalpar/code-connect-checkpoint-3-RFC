import { describe, expect, it } from "vitest";
import { validatePostForm } from "./validation";
describe("validação de publicação", () => {
  it("exige título, descrição e imagem", () => {
    expect(validatePostForm({ title: "", body: "Texto", hasImage: true })).toBe(
      "Informe o nome do projeto.",
    );
    expect(
      validatePostForm({ title: "Projeto", body: "", hasImage: true }),
    ).toBe("Informe a descrição do projeto.");
    expect(
      validatePostForm({ title: "Projeto", body: "Texto", hasImage: false }),
    ).toBe("Selecione uma imagem para o projeto.");
  });
  it("aceita um formulário completo", () => {
    expect(
      validatePostForm({ title: "Projeto", body: "Descrição", hasImage: true }),
    ).toBe("");
  });
});
