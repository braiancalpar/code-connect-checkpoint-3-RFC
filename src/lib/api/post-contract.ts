import type { Comment, Post } from "@/types";

export class PostContractError extends Error {
  constructor(path: string) {
    super(`Resposta de post incompatível com o contrato em "${path}".`);
    this.name = "PostContractError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isAuthor(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string"
  );
}

function isComment(value: unknown): value is Comment {
  return (
    isRecord(value) &&
    typeof value.id === "number" &&
    typeof value.text === "string" &&
    typeof value.postId === "number" &&
    isAuthor(value.author)
  );
}

export function assertPostContract(value: unknown): asserts value is Post {
  if (!isRecord(value)) throw new PostContractError("post");

  const stringFields = ["cover", "title", "slug", "body", "markdown"] as const;
  for (const field of stringFields) {
    if (typeof value[field] !== "string") {
      throw new PostContractError(field);
    }
  }

  if (
    typeof value.id !== "number" ||
    typeof value.likes !== "number" ||
    !isAuthor(value.author) ||
    !Array.isArray(value.comments) ||
    !value.comments.every(isComment)
  ) {
    throw new PostContractError("post fields");
  }

  if (
    value.imageUrl !== undefined &&
    value.imageUrl !== null &&
    typeof value.imageUrl !== "string"
  ) {
    throw new PostContractError("imageUrl");
  }
}
