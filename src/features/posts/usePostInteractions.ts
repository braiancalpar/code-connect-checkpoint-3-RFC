"use client";

import { useCallback, useState } from "react";
import type { Comment } from "@/types";

interface UsePostInteractionsOptions {
  postId: number;
  initialLikes: number;
  initialComments: Comment[];
}

async function getResponseData(
  response: Response,
): Promise<Record<string, unknown>> {
  try {
    return (await response.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export function usePostInteractions({
  postId,
  initialLikes,
  initialComments,
}: UsePostInteractionsOptions) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isLiking, setIsLiking] = useState(false);
  const [interactionError, setInteractionError] = useState("");

  const like = useCallback(async () => {
    setIsLiking(true);
    setInteractionError("");

    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
      });
      const data = await getResponseData(response);

      if (!response.ok) {
        setInteractionError(
          typeof data.message === "string"
            ? data.message
            : "Não foi possível curtir o projeto.",
        );
        return;
      }

      setLikes((current) =>
        typeof data.likes === "number" ? data.likes : current + 1,
      );
    } catch {
      setInteractionError("Não foi possível conectar ao servidor.");
    } finally {
      setIsLiking(false);
    }
  }, [postId]);

  const addComment = useCallback((comment: Comment) => {
    setComments((current) => [comment, ...current]);
  }, []);

  const deleteComment = useCallback(async (commentId: number) => {
    setInteractionError("");

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await getResponseData(response);
        setInteractionError(
          typeof data.message === "string"
            ? data.message
            : "Não foi possível excluir o comentário.",
        );
        return false;
      }

      setComments((current) =>
        current.filter((comment) => comment.id !== commentId),
      );
      return true;
    } catch {
      setInteractionError("Não foi possível conectar ao servidor.");
      return false;
    }
  }, []);

  return {
    likes,
    comments,
    isLiking,
    interactionError,
    like,
    addComment,
    deleteComment,
  };
}
