import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  outline?: boolean;
  href?: string;
};
export function Button({
  children,
  outline = false,
  href,
  className,
  ...rest
}: Props) {
  const classes =
    `${outline ? styles.outline : styles.btn} ${className ?? ""}`.trim();
  if (href)
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
