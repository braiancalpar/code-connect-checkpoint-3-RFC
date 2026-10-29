import type { ReactNode } from "react";
import styles from "./subheading.module.css";
export function Subheading({ children }: { children: ReactNode }) {
  return <h2 className={styles.subheading}>{children}</h2>;
}
