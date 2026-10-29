import type {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";
import styles from "./typography.module.css";
type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "bold" | "body";

type Props = HTMLAttributes<HTMLElement> & {
  variant?: Variant;
  children: ReactNode;
  color?: string;
};

export default function Typography({
  variant = "body",
  children,
  className = "",
  color,
  style,
  ...props
}: Props) {
  const Tag: ElementType =
    variant === "bold" ? "strong" : variant === "body" ? "p" : variant;

  const css = {
    ...style,
    "--typography-color": color ? `var(${color})` : "var(--light-gray)",
  } as CSSProperties;

  return (
    <Tag
      className={`${styles[variant]} ${className}`.trim()}
      style={css}
      {...props}
    >
      {children}
    </Tag>
  );
}
