import { Aside } from "@/components/Aside";
import styles from "./app.module.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.app}>
      <Aside />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
