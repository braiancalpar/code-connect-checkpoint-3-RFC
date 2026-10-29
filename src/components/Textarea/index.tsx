import type { TextareaHTMLAttributes } from "react";
import styles from "./textarea.module.css";
export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={styles.textarea} {...props} />;
}
