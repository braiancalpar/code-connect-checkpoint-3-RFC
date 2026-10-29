"use client";
import { useRef, useState } from "react";
import { IconButton } from "@/components/IconButton";
import { Modal, type ModalHandle } from "@/components/Modal";
import { Textarea } from "@/components/Textarea";
import { Subheading } from "@/components/Subheading";
import { IconChat } from "@/components/icons/IconChat";
import { IconArrowFoward } from "@/components/icons/IconArrowFoward";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/Button";
import { useAuth } from "@/components/AuthProvider";
import type { Comment } from "@/types";
import styles from "./commentmodal.module.css";

type Props = {
  isEditing?: boolean;
  onSuccess: (comment: Comment) => void;
  postId?: number;
  defaultValue?: string;
  commentId?: number;
};
export function ModalComment({
  isEditing = false,
  onSuccess,
  postId,
  defaultValue = "",
  commentId,
}: Props) {
  const modalRef = useRef<ModalHandle>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = String(data.get("text") ?? "").trim();
    if (!text) return;
    setLoading(true);
    setError("");
    try {
      const url = isEditing
        ? `/api/comments/${commentId}`
        : `/api/comments/post/${postId}`;
      const response = await fetch(url, {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "Não foi possível salvar o comentário.");
        return;
      }
      onSuccess(result);
      modalRef.current?.closeModal();
    } catch {
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Modal ref={modalRef}>
        <form onSubmit={onSubmit}>
          <Subheading>
            {isEditing
              ? "Editar comentário:"
              : "Deixe seu comentário sobre o post:"}
          </Subheading>
          <Textarea
            required
            rows={8}
            name="text"
            placeholder="Digite aqui..."
            defaultValue={defaultValue}
          />
          {error && (
            <p role="alert" style={{ color: "#ff8a8a" }}>
              {error}
            </p>
          )}
          <div className={styles.footer}>
            <Button disabled={loading} type="submit">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {isEditing ? "Atualizar" : "Comentar"} <IconArrowFoward />
                </>
              )}
            </Button>
          </div>
        </form>
      </Modal>
      <IconButton
        type="button"
        onClick={() => modalRef.current?.openModal()}
        disabled={!isAuthenticated}
        title={isAuthenticated ? "Comentar" : "Faça login para comentar"}
      >
        <IconChat fill={isEditing ? "#000" : "#888888"} />
      </IconButton>
    </>
  );
}
