# CodeConnect — Checkpoint React Nível 2

Migração da base original em **React + Vite** para **Next.js com App Router e TypeScript**, mantendo a comunicação com o backend oficial do CodeConnect e reutilizando os componentes visuais, CSS Modules e imagens da aplicação anterior.

## Problemas tratados

A base carregava feed, detalhes e perfil somente no navegador, depois da execução do JavaScript. A autenticação armazenava JWT e usuário no `localStorage`, enquanto a proteção das rotas acontecia apenas por um componente React.

Nesta PoC:

- o feed e os detalhes são renderizados no servidor;
- o conteúdo público usa cache com revalidação de 60 segundos e invalidação após mutações;
- as rotas privadas são verificadas pelo middleware e novamente no servidor;
- o JWT fica em cookie `HttpOnly`;
- o navegador chama rotas internas do Next.js, que encaminham as operações protegidas ao backend;
- os contratos principais foram convertidos para TypeScript;
- UI, hooks de comportamento, sessão, acesso a dados e regras de validação foram separados;
- há testes de acesso, redirecionamento, cookie, BFF, estado de formulário e erro de login.

## Arquitetura

```text
src/
├── app/
│   ├── (app)/                  # Layout principal, páginas públicas e privadas
│   ├── api/                    # BFF/proxy para o backend oficial
│   └── auth/                   # Login e cadastro
├── components/                 # Componentes visuais reutilizados e tipados
├── features/posts/             # Hooks e regras específicas de publicação/interação
├── lib/api/                    # Comunicação server-side com o backend
├── lib/auth/                   # Sessão, cookie e controle de acesso
├── tests/                      # Configuração dos testes
├── types/                      # Contratos de usuário, post e comentário
└── middleware.ts               # Redirecionamento antecipado de rotas privadas
```

## Pré-requisitos

- Node.js 20 ou superior;
- backend oficial do CodeConnect executando em `http://localhost:3000`;
- frontend Next.js executando em `http://localhost:3001`.

O frontend usa a porta 3001 para não disputar a porta 3000 com o backend.

## Configuração

```bash
cp .env.example .env.local
npm install
npm run dev
```

No Windows, crie manualmente o arquivo `.env.local` com:

```env
API_URL=http://localhost:3000
```

## Backend

Siga o README do backend oficial da Alura, execute as migrações e o seed e inicie a API antes do frontend.

Repositório: `https://github.com/alura-cursos/code-connect--backend`

## Rotas

### Públicas

- `/` — feed renderizado no servidor;
- `/blog-post/[slug]` — detalhes do projeto;
- `/sobre` — página institucional;
- `/usuarios/[id]` — perfil público derivado dos projetos do autor;
- `/visao-tecnica` — decisões, pontos fortes e limitações;
- `/decisoes-tecnicas` — decisões arquiteturais, flags e eventos locais da PoC;
- `/auth/login` e `/auth/register`.

### Privadas

- `/publicar`;
- `/perfil`;
- `/rascunhos`.

## Autenticação

1. O formulário envia as credenciais para `/api/auth/login`.
2. O Route Handler chama `POST /auth/login` no backend.
3. O JWT retornado é guardado no cookie `codeconnect_token` com `HttpOnly` e `SameSite=Lax`.
4. As rotas internas de publicação, curtidas e comentários leem o cookie no servidor e adicionam `Authorization: Bearer` ao chamar o backend.
5. A validade da sessão é confirmada em `GET /auth/me`.

O middleware melhora a experiência redirecionando requisições sem cookie e preserva o destino original para o retorno após o login. A autorização real é repetida no layout privado e pelo backend. Uma resposta `401` encerra a sessão, enquanto falhas de rede ou do backend são tratadas como indisponibilidade e não como logout.

## Entrega e cache

Feed, detalhes e perfis públicos são renderizados no servidor e revalidados a cada 60 segundos. Publicação, curtidas e alterações em comentários invalidam a tag compartilhada dos projetos, permitindo que o próximo acesso recupere dados atuais. Sessão e operações privadas permanecem com `no-store`.

## Testes

```bash
npm test
```

Os testes verificam:

1. classificação de rotas públicas e privadas;
2. redirecionamento real do middleware com preservação do destino;
3. rejeição de destinos externos após autenticação;
4. criação do cookie de sessão `HttpOnly` sem exposição do JWT no corpo;
5. bloqueio de publicação sem sessão e encaminhamento server-side do bearer token;
6. distinção entre sessão inválida e indisponibilidade do backend;
7. invalidação de cache após publicação;
8. validação dos campos obrigatórios de publicação;
9. fluxo do formulário de login até a resposta de erro da API;
10. carregamento da sessão e interação de curtida no card de post, com snapshot
    do markup;
11. configuração persistente de feature flags e fallback para configuração
    inválida;
12. captura e consulta local de erros, Web Vitals e evento do feed;
13. validação da resposta de posts contra os campos documentados e os tipos
    consumidos pelo frontend.

## Comandos

```bash
npm run dev
npm run build
npm run start
npm run lint
npm test
```

## Limitações da PoC

- o backend usa SQLite e arquivos locais;
- não existe endpoint público dedicado para buscar um usuário; por isso, o perfil público depende de ele possuir ao menos um projeto;
- não existe refresh token;
- rascunhos ainda não possuem persistência no backend;
- as tags do formulário são apenas uma demonstração visual, pois o backend atual não oferece esse campo;
- provedores Google e GitHub são apenas elementos visuais desabilitados;
- não há paginação nem testes end-to-end completos;
- as feature flags e a observabilidade em `/decisoes-tecnicas` são locais ao
  navegador/sessão; não oferecem rollout compartilhado nem monitoramento de
  produção;
- o frontend depende de o backend estar disponível para revalidar páginas e executar operações.

## O que seria necessário para produção

Seriam recomendados banco gerenciado, storage externo para imagens, refresh e revogação de sessão, rate limiting, proteção CSRF nas mutações, monitoramento, paginação, tratamento de imagens e testes end-to-end cobrindo os principais fluxos.
