"use client";
import Image from "next/image";
import logo from "./logo.png";
import AsideLink from "@/components/AsideLink";
import { IconFeed } from "@/components/icons/IconFeed";
import { IconAccount } from "@/components/icons/IconAccount";
import { IconInfo } from "@/components/icons/IconInfo";
import { IconLogin } from "@/components/icons/IconLogin";
import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { useAuth } from "@/components/AuthProvider";
import styles from "./aside.module.css";

export function Aside() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  return (
    <aside className={styles.aside}>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <Image src={logo} alt="Logo da CodeConnect" priority />
            </Link>
          </li>
          <li>
            <Button href="/publicar" outline>
              Publicar
            </Button>
          </li>
          <li>
            <AsideLink href="/">
              <IconFeed />
              Feed
            </AsideLink>
          </li>
          <li>
            <AsideLink href="/perfil">
              <IconAccount />
              Perfil
            </AsideLink>
          </li>
          <li>
            <AsideLink href="/sobre">
              <IconInfo />
              Sobre nós
            </AsideLink>
          </li>
          <li>
            <AsideLink href="/visao-tecnica">
              <IconInfo />
              Visão técnica
            </AsideLink>
          </li>
          {!isLoading && (
            <li>
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => void logout()}
                  style={{ background: "none", border: 0, padding: 0 }}
                >
                  <span className={styles.logout}>
                    <IconLogin />
                    Logout
                  </span>
                </button>
              ) : (
                <AsideLink href="/auth/login">
                  <IconLogin />
                  Login
                </AsideLink>
              )}
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}
