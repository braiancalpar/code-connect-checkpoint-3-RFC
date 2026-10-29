import type { ApiErrorBody, Post, User } from "@/types";

export const API_URL = process.env.API_URL ?? "http://localhost:3000";

export type BackendRequestInit = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

export class BackendError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: ApiErrorBody,
  ) {
    super(message);
    this.name = "BackendError";
  }
}

export function getErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback;
  const candidate = body as ApiErrorBody;
  if (Array.isArray(candidate.message)) return candidate.message.join(" ");
  if (typeof candidate.message === "string") return candidate.message;
  if (typeof candidate.error === "string") return candidate.error;
  return fallback;
}

function absoluteAssetUrl(value?: string | null): string {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `${API_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

export function normalizeUser(user: User): User {
  return {
    ...user,
    avatar: user.avatar ? absoluteAssetUrl(user.avatar) : null,
  };
}

export function normalizePost(post: Post): Post {
  return {
    ...post,
    cover: absoluteAssetUrl(post.cover || post.imageUrl),
    imageUrl: post.imageUrl ? absoluteAssetUrl(post.imageUrl) : undefined,
    likes: Number(post.likes ?? 0),
    comments: Array.isArray(post.comments) ? post.comments : [],
    author: {
      ...post.author,
      avatar: post.author?.avatar ? absoluteAssetUrl(post.author.avatar) : null,
    },
  };
}

export async function backendFetch<T>(
  path: string,
  init: BackendRequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}/${path.replace(/^\//, "")}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init.headers,
    },
  });

  const contentType = response.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new BackendError(
      getErrorMessage(body, `A API respondeu com status ${response.status}.`),
      response.status,
      typeof body === "object" ? (body as ApiErrorBody) : undefined,
    );
  }

  return body as T;
}
