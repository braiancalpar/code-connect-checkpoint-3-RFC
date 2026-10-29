"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { validatePostForm } from "./validation";

export function useNewPostForm(defaultPreview: string) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [tagList, setTagList] = useState(["Front-end"]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(defaultPreview);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");

  useEffect(
    () => () => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  function reset() {
    setTitle("");
    setBody("");
    setTags("");
    setTagList([]);
    setImage(null);
    setPreview(defaultPreview);
    setMessage("");
    setMessageType("");
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : defaultPreview);
  }

  function handleAddTag(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const tag = tags.trim();
    if (tag && !tagList.includes(tag)) setTagList([...tagList, tag]);
    setTags("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setMessageType("");

    const validation = validatePostForm({
      title,
      body,
      hasImage: Boolean(image),
    });
    if (validation) {
      setMessage(validation);
      setMessageType("error");
      return;
    }

    const data = new FormData();
    data.append("title", title.trim());
    data.append("body", body.trim());
    data.append("markdown", body.trim());
    data.append("image", image as File);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Não foi possível publicar o projeto.");
        setMessageType("error");
        return;
      }

      reset();
      setMessage("Projeto publicado com sucesso.");
      setMessageType("success");
      router.refresh();
    } catch {
      setMessage("Não foi possível conectar ao servidor.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    title,
    setTitle,
    body,
    setBody,
    tags,
    setTags,
    tagList,
    setTagList,
    image,
    preview,
    isSubmitting,
    message,
    messageType,
    reset,
    handleImageChange,
    handleAddTag,
    handleSubmit,
  };
}
