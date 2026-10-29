import { BackendError, backendFetch, normalizePost } from "./backend";
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
  const posts = await backendFetch<Post[]>(`blog-posts${query}`, {
    next: {
      revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
      tags,
    },
  });
  return posts.map(normalizePost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await backendFetch<Post>(
      `blog-posts/slug/${encodeURIComponent(slug)}`,
      {
        next: {
          revalidate: PUBLIC_CONTENT_REVALIDATE_SECONDS,
          tags: [POSTS_CACHE_TAG, postCacheTag(slug)],
        },
      },
    );
    return normalizePost(post);
  } catch (error) {
    if (error instanceof BackendError && error.status === 404) return null;
    throw error;
  }
}
