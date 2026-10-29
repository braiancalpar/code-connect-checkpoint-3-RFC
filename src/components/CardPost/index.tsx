"use client";
import NextLink from "next/link";
import { Author } from "@/components/Author";
import { ModalComment } from "@/components/ModalComment";
import { ThumbsUpButton } from "./ThumbsUpButton";
import { useAuth } from "@/components/AuthProvider";
import { usePostInteractions } from "@/features/posts/usePostInteractions";
import type { Post } from "@/types";
import styles from "./cardpost.module.css";

export function CardPost({ post }: { post: Post }) {
  const { isAuthenticated } = useAuth();
  const { likes, comments, isLiking, interactionError, like, addComment } =
    usePostInteractions({
      postId: post.id,
      initialLikes: post.likes,
      initialComments: post.comments,
    });

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <figure className={styles.figure}>
          {post.cover && (
            <img
              src={post.cover}
              alt={`Capa do post de título: ${post.title}`}
            />
          )}
        </figure>
      </header>
      <section className={styles.body}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <NextLink href={`/blog-post/${post.slug}`}>Ver detalhes</NextLink>
      </section>
      <footer className={styles.footer}>
        <div className={styles.actions}>
          <div className={styles.action}>
            <ThumbsUpButton
              loading={isLiking}
              onClick={() => void like()}
              disabled={!isAuthenticated}
              title={isAuthenticated ? "Curtir" : "Faça login para curtir"}
            />
            <p>{likes}</p>
          </div>
          <div className={styles.action}>
            <ModalComment onSuccess={addComment} postId={post.id} />
            <p>{comments.length}</p>
          </div>
        </div>
        <Author author={post.author} />
      </footer>
      {interactionError && (
        <p role="alert" style={{ color: "#ff8a8a", padding: "0 16px 16px" }}>
          {interactionError}
        </p>
      )}
    </article>
  );
}
