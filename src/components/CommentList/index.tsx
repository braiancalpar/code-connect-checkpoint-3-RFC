"use client";
import { Comment } from "@/components/Comment";
import type { Comment as CommentType } from "@/types";
import styles from "./commentlist.module.css";
export function CommentList({
  comments,
  onDelete,
}: {
  comments: CommentType[];
  onDelete: (id: number) => Promise<void>;
}) {
  return (
    <section className={styles.comments}>
      <h2>Comentários</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Comment comment={comment} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </section>
  );
}
