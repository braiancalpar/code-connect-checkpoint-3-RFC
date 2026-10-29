import styles from "./textdivider.module.css";
export function TextDivider({ text }: { text: string }) {
  return (
    <div className={styles.container}>
      <div className={styles.line} />
      <span className={styles.text}>{text}</span>
      <div className={styles.line} />
    </div>
  );
}
