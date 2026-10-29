import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import styles from "./authformcontainer.module.css";
export function AuthFormContainer({
  children,
  bannerSrc,
}: {
  children: ReactNode;
  bannerSrc: StaticImageData;
}) {
  return (
    <div className={styles.container}>
      <figure>
        <Image src={bannerSrc} alt="" priority />
      </figure>
      <div className={styles["form-wrapper"]}>{children}</div>
    </div>
  );
}
