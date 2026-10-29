"use client";
import { Button } from "@/components/Button";
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main style={{ color: "var(--offwhite)" }}>
      <h1>Não foi possível carregar esta página.</h1>
      <Button type="button" onClick={reset}>
        Tentar novamente
      </Button>
    </main>
  );
}
