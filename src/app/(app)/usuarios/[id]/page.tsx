import { notFound } from "next/navigation";
import { CardPost } from "@/components/CardPost";
import { getPosts } from "@/lib/api/posts";
import styles from "./profile.module.css";

export const revalidate = 60;

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const posts = await getPosts(id);
  if (posts.length === 0) notFound();
  const author = posts[0].author;
  const displayName = author.name || "Usuário";
  const username = author.username || author.name;
  return (
    <main className={styles.main}>
      <header className={styles.profileHeader}>
        <div className={styles.avatar}>
          {author.avatar ? (
            <img src={author.avatar} alt={`Avatar de ${displayName}`} />
          ) : (
            <span>{displayName.charAt(0)}</span>
          )}
        </div>
        <section className={styles.userInfo}>
          <div className={styles.userActions}>
            <span>@{username}</span>
          </div>
          <h1>{displayName}</h1>
          <p>
            Perfil público construído a partir dos projetos publicados por esta
            pessoa.
          </p>
          <ul>
            <li>{posts.length} Projetos</li>
          </ul>
        </section>
      </header>
      <nav className={styles.tabs} aria-label="Projetos públicos">
        <a href="#projetos">Projetos publicados</a>
      </nav>
      <section id="projetos" className={styles.grid}>
        {posts.map((post) => (
          <CardPost key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}
