import type { InputHTMLAttributes } from "react";
import styles from "./checkbox.module.css";
type Props = InputHTMLAttributes<HTMLInputElement> & { label: string };
export function Checkbox({ label, ...rest }: Props) {
  return (
    <label className={styles.container}>
      <input type="checkbox" {...rest} className={styles.checkbox} />
      {label}
    </label>
  );
}
