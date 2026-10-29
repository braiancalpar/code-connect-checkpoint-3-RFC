import Link from "next/link";
export default function RootNotFound() {
  return (
    <main style={{ color: "white", padding: 48 }}>
      <h1>404 — Página não encontrada</h1>
      <Link href="/" style={{ color: "#81FE88" }}>
        Voltar ao início
      </Link>
    </main>
  );
}
