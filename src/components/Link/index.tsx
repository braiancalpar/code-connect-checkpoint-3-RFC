import NextLink from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./link.module.css";
type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};
export function Link({ children, href, className = "", ...props }: Props) {
  return (
    <NextLink
      href={href}
      {...props}
      className={`${styles.link} ${className}`.trim()}
    >
      {children}
    </NextLink>
  );
}
