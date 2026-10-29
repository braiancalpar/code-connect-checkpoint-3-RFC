import type { ButtonHTMLAttributes } from "react";
import styles from "./iconbutton.module.css";
export function IconButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={styles.btn} />;
}
