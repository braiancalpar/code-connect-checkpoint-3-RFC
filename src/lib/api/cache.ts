export const PUBLIC_CONTENT_REVALIDATE_SECONDS = 60;
export const POSTS_CACHE_TAG = "posts";

export function postCacheTag(slug: string): string {
  return `post:${slug}`;
}

export function authorPostsCacheTag(authorId: string): string {
  return `author-posts:${authorId}`;
}
