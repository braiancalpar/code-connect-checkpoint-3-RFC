import { notFound } from "next/navigation";
import { PostDetails } from "@/components/PostDetails";
import { getPostBySlug } from "@/lib/api/posts";

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return <PostDetails initialPost={post!} />;
}
