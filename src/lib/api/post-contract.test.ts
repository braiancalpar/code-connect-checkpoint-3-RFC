import { describe, expect, it } from "vitest";
import { assertPostContract, PostContractError } from "./post-contract";

const validPost = {
  id: 21,
  cover: "https://example.test/cover.png",
  imageUrl: "https://example.test/image.png",
  title: "Projeto CodeConnect",
  slug: "projeto-codeconnect",
  body: "Descrição do projeto",
  markdown: "## Projeto",
  likes: 3,
  author: {
    id: "author-1",
    name: "Pessoa autora",
    username: "autora",
    avatar: null,
  },
  comments: [
    {
      id: 2,
      text: "Comentário",
      postId: 21,
      author: { id: "author-2", name: "Pessoa comentarista" },
    },
  ],
};

describe("post API contract", () => {
  it("accepts the documented post fields and frontend comment types", () => {
    expect(() => assertPostContract(validPost)).not.toThrow();
  });

  it("accepts a null imageUrl returned by the running API", () => {
    expect(() =>
      assertPostContract({ ...validPost, imageUrl: null }),
    ).not.toThrow();
  });

  it.each([
    ["cover", { ...validPost, cover: 12 }],
    ["imageUrl", { ...validPost, imageUrl: 12 }],
    ["comments", { ...validPost, comments: [{ id: "not-a-number" }] }],
    ["author", { ...validPost, author: { id: 1, name: "Pessoa autora" } }],
  ])("rejects an invalid %s field", (_field, response) => {
    expect(() => assertPostContract(response)).toThrow(PostContractError);
  });

  it("rejects an API error body instead of treating it as a post", () => {
    expect(() =>
      assertPostContract({ message: "Post não encontrado", statusCode: 404 }),
    ).toThrow(PostContractError);
  });
});
