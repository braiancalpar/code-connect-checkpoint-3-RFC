import type { LabelHTMLAttributes } from "react";
import styles from "./label.module.css";
export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className={styles.label} />;
}
