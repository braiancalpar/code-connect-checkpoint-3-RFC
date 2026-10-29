import type { Author } from "@/types";
import styles from "./avatar.module.css";
export function Avatar({ author }: { author: Author }) {
  return (
    <div className={styles.container}>
      {author.avatar ? (
        <img
          src={author.avatar}
          width={32}
          height={32}
          alt={`Avatar de ${author.name}`}
        />
      ) : null}
    </div>
  );
}
