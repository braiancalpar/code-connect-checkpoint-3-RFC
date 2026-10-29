import type { FieldsetHTMLAttributes } from "react";
import styles from "./fieldset.module.css";
export function Fieldset(props: FieldsetHTMLAttributes<HTMLFieldSetElement>) {
  return <fieldset {...props} className={styles.fieldset} />;
}
