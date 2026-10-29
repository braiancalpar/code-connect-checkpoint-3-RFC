"use client";
import { useState } from "react";
import { Avatar } from "@/components/Avatar";
import { ModalComment } from "@/components/ModalComment";
import { IconButton } from "@/components/IconButton";
import { useAuth } from "@/components/AuthProvider";
import type { Comment as CommentType } from "@/types";
import styles from "./comment.module.css";
export function Comment({
  comment,
  onDelete,
}: {
  comment: CommentType;
  onDelete: (id: number) => Promise<void>;
}) {
  const [text, setText] = useState(comment.text);
  const { user } = useAuth();
  const isOwner = user?.id === comment.author.id;
  return (
    <div className={styles.comment}>
      <Avatar author={comment.author} />
      <strong>@{comment.author.username || comment.author.name}</strong>
      <p>{text}</p>
      <div className={styles.divider} />
      {isOwner && (
        <ModalComment
          isEditing
          onSuccess={(updated) => setText(updated.text)}
          defaultValue={text}
          commentId={comment.id}
        />
      )}{" "}
      {isOwner && (
        <IconButton type="button" onClick={() => void onDelete(comment.id)}>
          Excluir
        </IconButton>
      )}
    </div>
  );
}
