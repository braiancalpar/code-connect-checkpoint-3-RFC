# Guia de contribuição

## 1. Objetivo e organização

O CodeConnect é um frontend Next.js para compartilhar projetos e conhecimento
em programação. Ele mantém a integração com a API oficial existente; mudanças
no backend, em endpoints ou em payloads não fazem parte deste repositório.

## 2. Tecnologias e comandos

- Next.js 15 com App Router, React 19 e TypeScript.
- npm para dependências (`package-lock.json`).
- Vitest e Testing Library para testes.
- `web-vitals` para coletar LCP, CLS e INP na PoC local.
- CSS Modules e folhas globais em `src/app/globals.css`.

Comandos disponíveis:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm test
npm test -- --coverage
npm run test:watch
```

O Vitest gera a cobertura com `@vitest/coverage-v8` e exige ao menos 80% em
linhas, instruções, funções e branches. A suite atual ainda não atinge esse
limiar, portanto `npm test -- --coverage` falha até que a cobertura seja
ampliada. O workflow `.github/workflows/ci.yml` executa lint e auditoria de
dependências em paralelo aos testes, cobertura e build; também publica o
relatório de cobertura como artefato. A auditoria bloqueia vulnerabilidades de
severidade alta ou crítica. O lockfile atual ainda contém vulnerabilidades
altas e críticas, que precisam ser corrigidas para esse job passar.

O backend deve estar disponível em `http://localhost:3000` para executar a
aplicação com dados reais. O frontend usa `http://localhost:3001`. Configure
`API_URL` no `.env.local`; nunca versione esse arquivo.

## 3. Estrutura e responsabilidades

- `src/app`: rotas, layouts, estados de carregamento/erro e Route Handlers do
  BFF.
- `src/components`: componentes reutilizáveis de interface.
- `src/features/posts`: hooks e validação relacionados a posts.
- `src/lib/api`: chamadas server-side, normalização e integração com o backend.
- `src/lib/auth`: sessão, cookies e controle de acesso.
- `src/lib/feature-flags`: avaliação e persistência local das flags de
  demonstração.
- `src/lib/observability`: captura local de erros e métricas.
- `src/types`: tipos compartilhados usados entre funcionalidades.
- `docs/code-connect-swagger-api`: documentação disponível dos contratos da
  API.

Mantenha a mudança dentro da funcionalidade pertinente. Evite dependências
circulares entre features e não mova módulos não relacionados somente para
padronizar pastas.

## 4. Convenções de código e nomenclatura

- Use TypeScript estrito e tipos explícitos nos limites de API e componentes.
- Componentes React usam nomes PascalCase; hooks começam com `use`.
- Mantenha estilos específicos junto ao componente em CSS Modules.
- Siga os padrões de exportação existentes no diretório; não é necessário
  criar barrel exports.
- Preserve Server Components por padrão e adicione `"use client"` somente onde
  houver interação ou APIs do navegador.

## 5. Criar componentes, hooks e serviços

- Crie componentes compartilhados em `src/components/<Nome>/` quando forem
  independentes de uma funcionalidade.
- Coloque lógica e hooks específicos de posts em `src/features/posts/`.
- Mantenha chamadas compartilhadas à API em `src/lib/api/` e use os Route
  Handlers existentes para operações protegidas.
- Não crie camadas ou serviços genéricos até haver mais de um caso real que
  justifique a abstração.

## 6. Integração com a API

- Preserve endpoints, payloads, autenticação e regras existentes.
- Use `API_URL` no servidor e a camada BFF já presente; não exponha tokens ao
  navegador.
- Consulte `docs/code-connect-swagger-api` e os tipos em `src/types`.
- Trate respostas inválidas e erros explicitamente, sem transformar falhas em
  respostas de sucesso.
- Se a documentação e uma resposta real divergirem, registre a divergência e
  não altere o backend como parte de uma mudança frontend.

## 7. Testes

- Coloque testes próximos ao módulo testado, usando os sufixos `.test.ts` ou
  `.test.tsx`.
- Use Testing Library para interações observáveis; isole chamadas externas nos
  limites do frontend.
- Valide contratos a partir da documentação e tipos existentes. Fixtures
  locais demonstram expectativas do frontend, não provam conformidade da API
  real.
- Execute `npm test` e, quando a mudança afetar estilos/markup crítico,
  mantenha assertions ou snapshots pequenos e relevantes.
- Execute também `npm run lint` e `npm run build` para mudanças que afetam a
  aplicação ou a configuração.

## 8. Revisão de Pull Request

Ao abrir um Pull Request, descreva o problema, o comportamento alterado e como
validou a mudança. Revise:

- compatibilidade das rotas e contratos existentes;
- estados de carregamento, vazio e erro;
- testes relevantes e resultado do build/lint;
- impacto de bundle e necessidade de dependências;
- ausência de arquivos de ambiente, tokens e dados pessoais.

## 9. Performance, erros e dados sensíveis

- Preserve carregamento por rota e renderização do App Router; adicione lazy
  loading somente quando houver benefício mensurável.
- Diferencie erro de rede, erro de API e sessão inválida.
- Não registre tokens, senhas, conteúdo de posts/comentários nem dados pessoais.
- A instrumentação atual é local à sessão e não é monitoramento de produção.

## 10. Feature flags

As flags demonstradas em `/decisoes-tecnicas` são armazenadas no navegador e
controlam apenas elementos visuais. Elas não são compartilhadas por usuários e
nunca substituem autorização no backend. Mantenha um fallback seguro quando a
configuração local estiver inválida ou indisponível. Uma solução remota exige
infraestrutura e decisão próprias.

## 11. Decisões arquiteturais

Registre propostas e decisões reais em `docs/RFC.md` e mantenha
`/decisoes-tecnicas` alinhada ao que foi aprovado e implementado. Identifique
propostas e experimentos pelo status; não apresente uma hipótese ou uma PoC
local como decisão definitiva ou serviço de produção.
