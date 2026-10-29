"use client";
import ReactMarkdown from "react-markdown";
import { ThumbsUpButton } from "@/components/CardPost/ThumbsUpButton";
import { Author } from "@/components/Author";
import Typography from "@/components/Typography";
import { CommentList } from "@/components/CommentList";
import { ModalComment } from "@/components/ModalComment";
import { useAuth } from "@/components/AuthProvider";
import { usePostInteractions } from "@/features/posts/usePostInteractions";
import type { Post } from "@/types";
import styles from "./blogpost.module.css";
export function PostDetails({ initialPost }: { initialPost: Post }) {
  const { isAuthenticated } = useAuth();
  const {
    likes,
    comments,
    isLiking,
    interactionError,
    like,
    addComment,
    deleteComment,
  } = usePostInteractions({
    postId: initialPost.id,
    initialLikes: initialPost.likes,
    initialComments: initialPost.comments,
  });

  async function removeComment(id: number) {
    if (!window.confirm("Tem certeza que deseja remover o comentário?")) return;
    await deleteComment(id);
  }
  return (
    <main className={styles.main}>
      <article className={styles.card}>
        <header className={styles.header}>
          <figure className={styles.figure}>
            {initialPost.cover && (
              <img
                src={initialPost.cover}
                alt={`Capa do post de título: ${initialPost.title}`}
              />
            )}
          </figure>
        </header>
        <section className={styles.body}>
          <h2>{initialPost.title}</h2>
          <p>{initialPost.body}</p>
        </section>
        <footer className={styles.footer}>
          <div className={styles.actions}>
            <div className={styles.action}>
              <ThumbsUpButton
                loading={isLiking}
                onClick={() => void like()}
                disabled={!isAuthenticated}
              />
              <p>{likes}</p>
            </div>
            <div className={styles.action}>
              <ModalComment onSuccess={addComment} postId={initialPost.id} />
              <p>{comments.length}</p>
            </div>
          </div>
          <Author author={initialPost.author} />
        </footer>
        {interactionError && (
          <p role="alert" style={{ color: "#ff8a8a", padding: "0 16px 16px" }}>
            {interactionError}
          </p>
        )}
      </article>
      <Typography variant="h3">Código:</Typography>
      <div className={styles.code}>
        <ReactMarkdown>{initialPost.markdown}</ReactMarkdown>
      </div>
      <CommentList comments={comments} onDelete={removeComment} />
    </main>
  );
}
