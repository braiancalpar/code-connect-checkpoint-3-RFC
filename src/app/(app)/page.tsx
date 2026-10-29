import { CardPost } from "@/components/CardPost";
import { FeedFirstPostMetric } from "@/components/FeedFirstPostMetric";
import { getPosts } from "@/lib/api/posts";
import { PostContractError } from "@/lib/api/post-contract";
import { BackendError } from "@/lib/api/backend";
import styles from "./feed.module.css";

export const revalidate = 60;

function getFeedErrorMessage(error: unknown) {
  if (error instanceof PostContractError) {
    return `A API retornou um post fora do formato esperado (${error.message}).`;
  }

  if (error instanceof BackendError) {
    return `A API respondeu com erro HTTP ${error.status}.`;
  }

  if (error instanceof TypeError) {
    return "Não foi possível conectar à API. Verifique API_URL e se o backend está acessível pelo servidor do Next.js.";
  }

  return "Ocorreu um erro inesperado ao carregar o feed.";
}

export default async function FeedPage() {
  try {
    const posts = await getPosts();
    return (
      <main className={styles.grid}>
        {posts.map((post, index) => (
          <CardPost
            key={post.slug}
            post={post}
            isFirstPost={index === 0}
          />
        ))}
        {posts.length > 0 && <FeedFirstPostMetric />}
      </main>
    );
  } catch (error) {
    return (
      <main className={styles.grid}>
        <p style={{ color: "var(--offwhite)" }}>
          Não foi possível carregar o feed. {getFeedErrorMessage(error)}
        </p>
      </main>
    );
  }
}
