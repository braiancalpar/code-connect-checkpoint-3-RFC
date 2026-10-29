import type { FormHTMLAttributes } from "react";
import styles from "./form.module.css";
export function Form(props: FormHTMLAttributes<HTMLFormElement>) {
  return <form {...props} className={styles.form} />;
}
