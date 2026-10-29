export default function DraftsPage() {
  return (
    <main
      style={{
        color: "var(--offwhite)",
        background: "var(--dark-gray)",
        borderRadius: 8,
        padding: 24,
      }}
    >
      <h1 style={{ color: "var(--highlight-green)" }}>Rascunhos</h1>
      <p>
        Esta rota privada demonstra a separação de acesso. A persistência de
        rascunhos ainda não existe no backend atual.
      </p>
    </main>
  );
}
