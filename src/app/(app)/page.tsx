import { CardPost } from "@/components/CardPost";
import { getPosts } from "@/lib/api/posts";
import styles from "./feed.module.css";

export const revalidate = 60;

export default async function FeedPage() {
  try {
    const posts = await getPosts();
    return (
      <main className={styles.grid}>
        {posts.map((post) => (
          <CardPost key={post.slug} post={post} />
        ))}
      </main>
    );
  } catch {
    return (
      <main className={styles.grid}>
        <p style={{ color: "var(--offwhite)" }}>
          Não foi possível carregar o feed. Confirme se o backend está em
          execução na porta 3000.
        </p>
      </main>
    );
  }
}
