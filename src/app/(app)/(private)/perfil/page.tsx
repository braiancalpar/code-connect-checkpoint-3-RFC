import { CardPost } from "@/components/CardPost";
import { Button } from "@/components/Button";
import { getPosts } from "@/lib/api/posts";
import { requireCurrentUser } from "@/lib/auth/session";
import styles from "./profile.module.css";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await requireCurrentUser();
  const posts = await getPosts(user.id);
  const displayName = user.name || "Usuário";
  const username = user.username || user.email;

  return (
    <main className={styles.main}>
      <header className={styles.profileHeader}>
        <div className={styles.avatar}>
          {user.avatar ? (
            <img src={user.avatar} alt={`Avatar de ${displayName}`} />
          ) : (
            <span>{displayName.charAt(0)}</span>
          )}
        </div>
        <section className={styles.userInfo}>
          <div className={styles.userActions}>
            <span>@{username}</span>
            <Button type="button" outline disabled>
              Seguir
            </Button>
          </div>
          <h1>{displayName}</h1>
          <p>{user.bio || "Atualize sua bio. Conte um pouco sobre você!"}</p>
          <ul>
            <li>{posts.length} Projetos</li>
            <li>Ainda não fez nenhuma conexão</li>
          </ul>
        </section>
      </header>
      <nav className={styles.tabs} aria-label="Projetos do perfil">
        <a href="#meus-projetos">Meus projetos</a>
        <span>Aprovados</span>
        <span>Compartilhados</span>
      </nav>
      <section id="meus-projetos" className={styles.grid}>
        {posts.length > 0 ? (
          posts.map((post) => <CardPost key={post.id} post={post} />)
        ) : (
          <p className={styles.empty}>Nenhum projeto publicado.</p>
        )}
      </section>
    </main>
  );
}
