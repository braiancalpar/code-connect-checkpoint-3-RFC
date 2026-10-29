const sectionStyle = {
  background: "var(--dark-gray)",
  borderRadius: 8,
  padding: 24,
  color: "var(--light-gray)",
  lineHeight: 1.6,
} as const;

export default function TechnicalVisionPage() {
  return (
    <main
      style={{ maxWidth: 780, paddingBottom: 56, display: "grid", gap: 24 }}
    >
      <h1 style={{ color: "var(--highlight-green)", margin: 0 }}>
        Visão técnica
      </h1>
      <section style={sectionStyle}>
        <h2>Problemas encontrados</h2>
        <p>
          Na base em Vite, o feed, os detalhes e o perfil dependiam de
          requisições feitas somente após o JavaScript carregar. O token também
          ficava no localStorage e as rotas privadas eram protegidas apenas no
          navegador.
        </p>
      </section>
      <section style={sectionStyle}>
        <h2>O que esta PoC demonstra</h2>
        <p>
          O App Router entrega as páginas públicas já renderizadas, mantém a
          comunicação com o backend existente, revalida o conteúdo público e
          utiliza uma camada de rotas do Next.js para guardar o JWT em cookie
          HttpOnly e encaminhar operações autenticadas.
        </p>
      </section>
      <section style={sectionStyle}>
        <h2>Onde a solução brilha</h2>
        <p>
          A separação entre componentes visuais, acesso a dados, sessão e hooks
          de comportamento facilita a manutenção. As mutações invalidam o cache
          público, o backend não precisa ser alterado e o navegador não manipula
          diretamente o JWT.
        </p>
      </section>
      <section style={sectionStyle}>
        <h2>Limitações</h2>
        <p>
          A PoC ainda depende do backend local e do armazenamento de imagens
          dele. Não há refresh token, paginação nem cobertura completa de testes
          end-to-end. A observabilidade e as feature flags desta evolução são
          demonstrações locais, sem monitoramento de produção ou rollout
          compartilhado. Rascunhos e tags também não possuem persistência. O
          perfil público depende dos dados de autoria presentes nos projetos,
          pois o backend não oferece uma consulta pública de usuário.
        </p>
      </section>
    </main>
  );
}
