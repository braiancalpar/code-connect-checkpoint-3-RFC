# CodeConnect — Evolução arquitetural do Frontend (Nível 3)

Frontend **Next.js 15, React 19 e TypeScript** para compartilhar projetos e
conhecimento em programação. Esta etapa evolui o checkpoint anterior de forma
incremental, preservando o App Router, o backend oficial, os contratos atuais,
os componentes e os estilos existentes.

## O que esta etapa demonstra

- Uma rota navegável `/decisoes-tecnicas` registra decisões, contexto,
  alternativas, consequências e status.
- Uma PoC de feature flags controla um destaque opcional no feed. A configuração
  é editável em `/decisoes-tecnicas`, persiste no navegador e não exige alteração
  de código ou novo deploy da aplicação.
- Um adaptador local captura erros não tratados, métricas LCP/CLS/INP e o evento
  de negócio `feed-first-post-visible`. Os eventos são consultáveis durante a
  sessão.
- Respostas de posts são validadas no limite de integração da API e cobertas por
  testes de contrato baseados na documentação existente.
- Testes cobrem fluxos de autenticação e interação com posts, configuração e
  fallback de flags, observabilidade e snapshot do card.
- O layout do feed distribui os cards com espaçamento consistente e alinhamento
  vertical dos rodapés.

Flags e observabilidade são **provas de conceito locais**, não serviços de
produção. A flag afeta somente a interface: autorização continua sendo
responsabilidade do backend. Nenhum endpoint, payload ou lógica do backend foi
alterado.

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
├── lib/feature-flags/           # Avaliação e persistência local das flags
├── lib/observability/           # Captura local de eventos e Web Vitals
├── tests/                      # Configuração dos testes
├── types/                      # Contratos de usuário, post e comentário
└── middleware.ts               # Redirecionamento antecipado de rotas privadas
```

`src/app` usa o App Router; `src/components` mantém a UI compartilhada; a
integração da API e a validação de respostas ficam em `src/lib/api`. A
documentação de decisões está em [`docs/RFC.md`](docs/RFC.md), e as orientações
para contribuir estão em [`CONTRIBUTING.md`](CONTRIBUTING.md).

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

## Feature flags e observabilidade

A PoC possui uma flag (`showPostHighlight`) avaliada por um provider
centralizado. O estado padrão é desativado; configuração local inválida ou
indisponível mantém as funcionalidades opcionais desativadas. A persistência é
local ao navegador e não dá suporte a segmentação, configuração central ou
rollout entre usuários.

Na rota `/decisoes-tecnicas`, a checkbox **Destacar posts no feed** ativa ou
desativa o destaque experimental no feed. **Restaurar padrão** desativa a flag.
A configuração é armazenada no `localStorage` deste navegador; não é
compartilhada com outras pessoas e não concede acesso a operações ou dados.
O painel **Eventos desta sessão** consulta e limpa os eventos que permanecem em
memória enquanto a aplicação está aberta.

O adaptador local registra erros sem incluir mensagens, tokens, credenciais ou
conteúdo do usuário. `web-vitals` coleta LCP, CLS e INP no navegador. O evento
`feed-first-post-visible` registra o tempo até o primeiro card ficar visível.
Os dados ficam em memória e podem ser vistos em `/decisoes-tecnicas`; não são
enviados a um serviço remoto, preservados entre sessões nem monitorados em
produção.

## Contrato da API

A integração de leitura de posts verifica os campos usados pelo frontend com
base na documentação em `docs/code-connect-swagger-api`. A API real foi
consultada durante esta etapa: `GET /blog-posts` respondeu com 14 posts e
`imageUrl: null` em todos eles. Embora a documentação local descreva `imageUrl`
como não nulo, o frontend aceita o valor nulo observado; `cover` continua
obrigatório. Essa validação e suas fixtures protegem o contrato consumido pelo
frontend, mas não garantem que futuras respostas da API sejam válidas.

## Testes

```bash
npm test
npm test -- --coverage
```

O Vitest usa `@vitest/coverage-v8` para gerar relatórios em `coverage/` e exige
no mínimo 40% de cobertura em linhas, instruções, funções e branches. A
cobertura atual ainda está abaixo desse limite; o comando com cobertura falha
até que a suite alcance os limiares configurados.

Os testes verificam (30 testes em 13 arquivos após as mudanças):

1. classificação de rotas públicas e privadas;
2. redirecionamento real do middleware com preservação do destino;
3. rejeição de destinos externos após autenticação;
4. rejeição de credenciais pela API sem criação de cookie de sessão;
5. criação do cookie de sessão `HttpOnly` sem exposição do JWT no corpo;
6. bloqueio de publicação sem sessão e confirmação de que o backend não é chamado;
7. distinção entre sessão inválida e indisponibilidade do backend;
8. criação de publicação e invalidação do cache do feed após sucesso;
9. validação dos campos obrigatórios de publicação;
10. envio de credenciais válidas e apresentação de erros no formulário de login;
11. carregamento da sessão e interação de curtida no card de post, com snapshot
    do markup;
12. configuração persistente de feature flags e fallback para configuração
    inválida;
13. captura e consulta local de erros, Web Vitals e evento do feed;
14. validação da resposta de posts contra os campos documentados e os tipos
    consumidos pelo frontend.

Os testes isolam chamadas externas onde necessário. O snapshot protege o markup
do card, não uma comparação de pixels em diferentes navegadores.

## Integração contínua

O workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) executa em
pushes e pull requests para `main`, usando Node.js 20 e cache npm. Ele separa
lint/auditoria de dependências dos testes com cobertura/build, e publica o
relatório de cobertura como artefato. A auditoria usa
`npm audit --audit-level=high`; vulnerabilidades altas ou críticas bloqueiam
esse job. No lockfile atual, a auditoria também identifica vulnerabilidades
altas e críticas, então o job de segurança permanece bloqueado até a atualização
das dependências afetadas.

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
- a configuração de flags não é remota nem compartilhada entre usuários;
- não foi feita medição controlada de bytes transferidos pela rede ou de Web
  Vitals em usuários reais;
- o frontend depende de o backend estar disponível para revalidar páginas e executar operações.

## Métricas do build

O relatório de `npm run build` após esta etapa indicou **102 kB** de JavaScript
compartilhado; First Load JS de **111 kB** para o feed, **105 kB** para
`/decisoes-tecnicas` e **144 kB** para detalhes de post. Esses valores são os
relatados pelo Next.js para os artefatos compilados; não equivalem a bytes
transferidos pela rede nem a medições de performance em runtime.

## O que seria necessário para produção

Seriam recomendados banco gerenciado, storage externo para imagens, refresh e revogação de sessão, rate limiting, proteção CSRF nas mutações, monitoramento, paginação, tratamento de imagens e testes end-to-end cobrindo os principais fluxos.
