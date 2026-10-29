import Link from "next/link";
import type { Author as AuthorType } from "@/types";
import { Avatar } from "@/components/Avatar";
import styles from "./author.module.css";
export function Author({ author }: { author: AuthorType }) {
  return (
    <ul className={styles.author}>
      <li>
        <Avatar author={author} />
      </li>
      <li>
        <Link
          href={`/usuarios/${author.id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          @{author.username || author.name}
        </Link>
      </li>
    </ul>
  );
}
