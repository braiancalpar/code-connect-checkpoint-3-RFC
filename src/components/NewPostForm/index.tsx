"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { useNewPostForm } from "@/features/posts/useNewPostForm";
import styles from "./newpost.module.css";
import defaultPreview from "./img-preview.png";

export function NewPostForm() {
  const {
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
  } = useNewPostForm(defaultPreview.src);

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.uploadColumn}>
          <figure className={styles.preview}>
            <img src={preview} alt="Prévia da imagem do projeto" />
          </figure>
          <label className={styles.uploadButton} htmlFor="image">
            Carregar imagem
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleImageChange}
          />
          {image && <p className={styles.fileName}>{image.name} ×</p>}
        </section>
        <section className={styles.fieldsColumn}>
          <h1>Novo projeto</h1>
          <label htmlFor="title">Nome do projeto</label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="React zero to hero"
          />
          <label htmlFor="body">Descrição</label>
          <Textarea
            id="body"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Descreva o projeto e, se desejar, inclua Markdown."
          />
          <label htmlFor="tags">Tags</label>
          <Input
            id="tags"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="React"
          />
          <div className={styles.tags} aria-label="Tags adicionadas">
            {tagList.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() =>
                  setTagList(tagList.filter((item) => item !== tag))
                }
              >
                {tag} ×
              </button>
            ))}
          </div>
          {message && (
            <p
              role="status"
              className={`${styles.message} ${messageType ? styles[messageType] : ""}`}
            >
              {message}
            </p>
          )}
          <div className={styles.actions}>
            <Button type="button" outline onClick={reset}>
              Descartar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Publicando..." : "Publicar"}
            </Button>
          </div>
        </section>
      </form>
    </main>
  );
}
