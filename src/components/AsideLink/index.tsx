import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./asidelink.module.css";
export default function AsideLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link href={href} className={styles.asidelink} onClick={onClick}>
      {children}
    </Link>
  );
}
