import Link from "next/link";
export default function NotFound() {
  return (
    <main style={{ color: "var(--offwhite)" }}>
      <h1>404 — Projeto não encontrado</h1>
      <Link href="/" style={{ color: "var(--highlight-green)" }}>
        Voltar ao feed
      </Link>
    </main>
  );
}
