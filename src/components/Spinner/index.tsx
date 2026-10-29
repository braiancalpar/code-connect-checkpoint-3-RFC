import styles from "./spinner.module.css";
export function Spinner() {
  return <span className={styles.loader} aria-label="Carregando" />;
}
