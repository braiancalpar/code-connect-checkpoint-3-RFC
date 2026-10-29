import Image from "next/image";
import { IconButton } from "@/components/IconButton";
import google from "./google.png";
import github from "./github.png";
import styles from "./providers.module.css";
export function Providers() {
  return (
    <ul className={styles.providers}>
      <li>
        <IconButton
          type="button"
          disabled
          title="Provedor não configurado nesta PoC"
        >
          <Image src={google} alt="Google" />
        </IconButton>
      </li>
      <li>
        <IconButton
          type="button"
          disabled
          title="Provedor não configurado nesta PoC"
        >
          <Image src={github} alt="GitHub" />
        </IconButton>
      </li>
    </ul>
  );
}
