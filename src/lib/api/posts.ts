import { BackendError, backendFetch, normalizePost } from "./backend";
import { assertPostContract, PostContractError } from "./post-contract";
import {
  authorPostsCacheTag,
  postCacheTag,
  POSTS_CACHE_TAG,
  PUBLIC_CONTENT_REVALIDATE_SECONDS,
} from "./cache";
import type { Post } from "@/types";

export async function getPosts(authorId?: string): Promise<Post[]> {
  const query = authorId ? `?authorId=${encodeURIComponent(authorId)}` : "";
  const tags = [
    POSTS_CACHE_TAG,
    ...(authorId ? [authorPostsCacheTag(authorId)] : []),
  ];
  const response = await backendFetch<unknown>(`blog-posts${query}`, {
    next: {
      revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
      tags,
    },
  });
  if (!Array.isArray(response)) throw new PostContractError("posts");
  return response.map((post) => {
    assertPostContract(post);
    return normalizePost(post);
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await backendFetch<unknown>(
      `blog-posts/slug/${encodeURIComponent(slug)}`,
      {
        next: {
          revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
          tags: [POSTS_CACHE_TAG, postCacheTag(slug)],
        },
      },
    );
    assertPostContract(response);
    return normalizePost(response);
  } catch (error) {
    if (error instanceof BackendError && error.status === 404) return null;
    throw error;
  }
}
