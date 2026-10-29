# RFC — Evolução arquitetural do frontend CodeConnect

- **Status:** aprovado para protótipo
- **Data:** 29 de outubro de 2026
- **Escopo:** frontend; o backend e seus contratos permanecem fora do escopo de alterações

## 1. Contexto e motivação

Este RFC se baseia na inspeção do repositório, na documentação existente e nos comandos executados. O objetivo não é substituir a arquitetura atual, mas estabelecer uma evolução incremental que possa ser aprovada antes de qualquer mudança de código.

### Estado observado

- A aplicação é um frontend **Next.js 15.5.2**, **React 19.1.1** e **TypeScript 5.8.3**, com App Router em `src/app`. O Next.js é a ferramenta de build e renderização; o gerenciador de pacotes é npm (`package-lock.json`). O `vite.config.ts` e as dependências Vite/Vitest configuram os testes, não o build de produção.
- O repositório contém o frontend; não foi encontrada uma aplicação backend local. A API é uma dependência externa configurada por `API_URL`, com exemplo em `.env.example`.
- A navegação usa segmentos e layouts do App Router. Há páginas públicas para feed, posts, perfis, conteúdo institucional e visão técnica; páginas privadas de publicação, perfil e rascunhos; rotas de autenticação e Route Handlers usados como BFF.
- A leitura pública de posts usa `fetch` no servidor com revalidação configurada em 60 segundos e tags para invalidação. `src/lib/api` concentra acesso ao backend, normalização de dados e helpers para os Route Handlers. `src/features/posts` já agrupa hooks e validação relacionados a posts; `src/components` concentra componentes compartilhados.
- A sessão usa cookie `HttpOnly`, `SameSite=Lax` e `Secure` em produção. O middleware redireciona acessos sem cookie a rotas privadas; o layout privado também valida a sessão no servidor. As operações protegidas são encaminhadas ao backend por rotas do Next.js. Essas medidas não substituem a autorização do backend.
- A árvore raiz envolve as páginas com um `AuthProvider` cliente, que consulta a sessão após a montagem. A oportunidade de reduzir JavaScript cliente deve ser medida antes de alterar esse comportamento.
- Há documentação da API em `docs/code-connect-swagger-api`, além do `README.md` e da página existente `/visao-tecnica`. O `README.md` registra limites conhecidos da PoC, como ausência de observabilidade, paginação e persistência de rascunhos.
- Não foi localizado mecanismo de feature flags, integração de observabilidade ou guia `CONTRIBUTING.md`. Também não há testes visuais/snapshots identificados.

### Medições e validações iniciais

Executadas sem instalar dependências ou alterar arquivos de código:

| Verificação | Resultado observado |
|---|---|
| `npm test` | Passou: 8 arquivos e 14 testes |
| `npm run lint` | Passou |
| `npm run build` | Exit code 0; compilação e verificação de tipos passaram. Durante a geração de páginas ocorreram falhas `ECONNREFUSED` ao buscar dados do backend, e o build ainda concluiu |
| Build Next.js | JavaScript compartilhado inicial: 102 kB; a rota do post detalhado mostra 38,3 kB e 144 kB de First Load JS |

Os tamanhos são os relatados pelo build do Next.js: não representam bytes transferidos pela rede. Após a PoC, uma nova compilação reportou 102 kB de JavaScript compartilhado, 111 kB de First Load JS para `/` (antes: 109 kB), 105 kB para `/decisoes-tecnicas` e 144 kB para o post detalhado (inalterado). O primeiro carregamento do feed aumentou 2 kB no indicador First Load JS; o chunk compartilhado não mudou. A PoC não mediu bytes transferidos pela rede.

Em uma abertura local não controlada de `/decisoes-tecnicas`, o painel exibiu LCP de 72 ms e CLS de 0,00; após interações, o CLS reportado mudou para 2,18. Esses dados confirmam que a coleta aparece no painel, mas não são uma medição comparável, uma linha de base nem um resultado representativo de usuários. O INP foi instrumentado, mas não observado nessa sessão. Não há cobertura medida nem medição de desempenho de usuários reais.

Após o backend ficar disponível, uma consulta real a `GET /blog-posts` respondeu HTTP 200 com 14 posts. Nos 14 registros observados, `imageUrl` era `null`, embora o documento Swagger local descreva esse campo como string não nula; os demais campos verificados correspondiam ao formato consumido pelo frontend. O contrato do frontend foi ajustado para aceitar `imageUrl` ausente ou nulo, mantendo `cover` obrigatório, e a compilação confirmou o feed prerenderizado com conteúdo e sem a mensagem de indisponibilidade. Isso registra uma divergência observada nessa resposta, não uma garantia geral sobre todas as respostas futuras da API.

Os testes existentes abrangem middleware, sessão, redirecionamento, validação de formulário, o formulário de login e Route Handlers com dependências externas isoladas. Isso é uma base útil, mas a suíte não demonstra dois fluxos completos ponta a ponta, um teste de contrato baseado em schema, nem regressão visual.

### Problemas efetivamente identificados e hipóteses

**Evidências:** não há flags ou observabilidade implementadas no código pesquisado; a suíte não tem cobertura visual/snapshot e não cobre os requisitos completos de integração e contrato; o build tentou acessar o backend durante a geração estática e recebeu conexão recusada; o provedor de autenticação cliente envolve a árvore inteira.

**Hipóteses a validar:** o JavaScript inicial ou o comportamento em rede pode ser um gargalo real para usuários; a indisponibilidade observada pode ser apenas a ausência momentânea do serviço durante o build, não uma falha estrutural. A saída atual do build, sozinha, não prova lentidão nem regressões de experiência.

## 2. Proposta arquitetural

As decisões abaixo foram aprovadas para este protótipo. A migração preserva App Router, backend, contratos, CSS Modules, npm e Vitest, evitando uma reescrita geral.

### 2.1 Organização e limites

Manter `src/app` como camada de rotas e composição do Next.js, `src/components` para UI reutilizável e `src/lib` para integrações compartilhadas. Evoluir por necessidade os módulos existentes em `src/features`, começando pelos fluxos escolhidos para a PoC:

```text
src/
  app/                    # Rotas, layouts, loading/error e adaptadores do Next
  components/             # UI compartilhada, sem regras de domínio
  features/
    posts/                # UI, hooks, validação e coordenação de posts
    auth/                 # Somente se a PoC exigir mover lógica hoje distribuída
  lib/
    api/                  # Backend, BFF e contratos de integração compartilhados
    auth/                 # Sessão e controle de acesso já existentes
    feature-flags/        # Avaliação e carregamento de configuração
    observability/        # Adaptador e destino de eventos
  types/                  # Tipos compartilhados quando não pertencem a uma feature
```

`src/features/posts` já existe; não se propõe mover todo o conteúdo de `components` nem criar módulos vazios para cumprir uma convenção. Rotas compõem funcionalidades; features não devem depender umas das outras circularmente. Dependências compartilhadas e integrações com o backend ficam em módulos de fronteira explícita. Exports públicos de uma feature podem ser introduzidos quando ajudarem a limitar consumidores, sem exigir barrel files.

### 2.2 Navegação, renderização e estado

Preservar App Router, Server Components e renderização já existentes. Usar estado local para interação de tela e dados de leitura no servidor quando compatível com a página; não introduzir uma biblioteca de estado global sem evidência de necessidade. O carregamento por segmentos de rota do Next.js é a estratégia inicial de divisão de código. Imports dinâmicos adicionais só devem ser adotados quando uma medição mostrar benefício e o estado de carregamento/erro puder ser tratado sem prejudicar conteúdo crítico.

### 2.3 API e erros

Manter `src/lib/api` e os Route Handlers como fronteira atual com a API oficial. Não alterar endpoints, payloads, autenticação ou backend. Usar os contratos documentados em `docs/code-connect-swagger-api` como fonte para testes e tipos, apontando divergências sem inferir comportamento não documentado. Diferenciar falha de rede, resposta de erro e sessão inválida; apresentar recuperação adequada à tela e evitar logs de tokens, credenciais, conteúdo privado ou dados pessoais.

### 2.4 Testes

Manter Vitest e Testing Library. Ampliar gradualmente:

1. testes de integração de fluxos relevantes compostos por componentes e integração frontend real, isolando somente fronteiras externas;
2. teste de contrato para campos e tipos documentados, incluindo resposta inválida e caso de erro; uma fixture validada demonstra a expectativa do frontend, não conformidade do backend;
3. snapshot ou regressão de markup de um componente visual crítico, complementado por assertions de comportamento.

Os testes devem continuar executáveis sem backend ativo. A disponibilidade e o contrato do backend real precisam ser verificados em ambiente separado, se houver acesso autorizado.

### 2.5 Feature flags

Centralizar definições, carregamento e avaliação em um módulo tipado. Flags controlam somente interface/experiência: autorização de dados e operações continua no servidor. A configuração deve falhar de forma segura, com funcionalidades opcionais desativadas se não puder ser lida.

Não há serviço remoto de configuração identificado. Para a PoC, a alternativa de menor impacto é um provedor local de demonstração com configuração persistida no navegador e controles visíveis na própria experiência de demonstração. Isso permite alterar flags sem mudar o código da funcionalidade nem publicar novamente a aplicação, mas não sincroniza usuários, não segmenta grupos e não representa configuração centralizada de produção. Uma configuração pública remota, hospedada separadamente e sem segredos, é uma evolução possível, mas depende de infraestrutura e URL que não existem no repositório.

### 2.6 Observabilidade

Criar uma interface/adaptador enxuto para capturar erros não tratados, métricas de carregamento disponíveis no navegador e um evento de negócio como o tempo entre a navegação e a exibição do primeiro post. Usar `web-vitals` para coletar LCP, CLS e INP segundo as definições da biblioteca, evitando uma implementação própria de métricas. A PoC pode manter uma fila local consultável numa tela de demonstração, sem enviar dados à rede. Isso valida captura e formato, mas não é monitoramento de produção: não persiste entre sessões, não alerta e não centraliza eventos. A integração com fornecedor ou endpoint deve ser uma decisão futura, respeitando amostragem, custo e remoção de dados sensíveis.

### 2.7 Rota de decisões técnicas

Adicionar `/decisoes-tecnicas`, sem caracteres acentuados na URL, seguindo a convenção do App Router. A página deve refletir decisões reais e suas alternativas, consequências e status. Enquanto este RFC aguarda aprovação, as propostas não devem aparecer como decisões aceitas. A data só deve ser registrada quando houver uma decisão efetiva.

## 3. Alternativas consideradas

| Decisão | Alternativas | Benefícios e custos | Proposta |
|---|---|---|---|
| Modularização | Reescrever toda a árvore; manter tudo flat; evoluir features por fluxo | Reescrita gera risco/custo sem necessidade demonstrada; estrutura flat mantém ambiguidade; migração pontual controla escopo e compatibilidade | Evoluir `features/posts` e criar somente os limites necessários à PoC |
| Estado | Biblioteca global; estado local e Server Components; cache cliente | Biblioteca adiciona dependência e decisões de sincronização; estado local/RSC já combina com App Router; cache cliente não é requisito comprovado | Manter os padrões atuais e evitar novo estado global |
| Divisão de código | Imports dinâmicos em toda parte; divisão automática por rota; microfrontends | Imports excessivos podem piorar UX; Next já separa segmentos; microfrontends aumentariam operação e complexidade sem equipes ou deploys independentes identificados | Usar divisão do App Router e otimizar somente após medição |
| Feature flags | Serviço externo; arquivo público remoto; configuração local de demonstração | Serviço externo dá gestão central, mas requer infraestrutura/credenciais; arquivo remoto separa deploys, mas depende de hosting e estratégia de cache; configuração local é simples e editável sem deploy da aplicação, mas só vale por navegador | PoC local transparente; decidir hosting remoto antes de prometer segmentação de usuários |
| Observabilidade | SDK de fornecedor; endpoint próprio; coletor local de PoC | SDK/endpoint oferecem operação real, mas exigem serviço, política de dados e custo; coletor local prova o formato sem transmissão, mas não monitora produção. `web-vitals` adiciona uma dependência pequena e específica para evitar reimplementar métricas padronizadas | PoC local usando `web-vitals`; selecionar integração de produção posteriormente |
| Testes visuais | Plataforma de browser; snapshot de markup; sem regressão visual | Plataforma visual exige dependência/infra; snapshot não detecta fidelidade de pixels e pode ser frágil; ausência deixa regressões de markup sem proteção | Snapshot limitado de componente existente, com assertions comportamentais |

## 4. Plano incremental proposto

Cada etapa depende da aprovação do RFC. Nenhuma altera o backend. A migração deve manter os fluxos existentes e validar mudanças com os comandos do projeto.

| Etapa | Entrega | Dependências e conclusão | Validação |
|---|---|---|---|
| 0. Aprovação e escopo | Confirmar estratégia de flags, escopo de observabilidade e fluxos de teste | Aprovação explícita deste RFC; decisões de infraestrutura remota ficam separadas | Registrar status e limites aprovados |
| 1. Base de documentação e decisões | `CONTRIBUTING.md` e rota `/decisoes-tecnicas`; registrar somente decisões aprovadas | Etapa 0; a rota deve usar o layout/navegação existentes | Build, lint e teste de navegação/markup da página |
| 2. Fronteira de feature e flags PoC | Integrar uma funcionalidade existente a um avaliador de flags configurável no navegador | Etapa 0; nenhuma alteração em contratos/API | Testes de flag ativa, inativa e configuração indisponível; provar alteração sem editar código nem redeploy da aplicação |
| 3. Observabilidade PoC | Capturar erro, métrica de navegação e evento do feed num visualizador local | Etapa 0; não transmitir dados | Testes de captura e sanitização; confirmar no visualizador e documentar que não é produção |
| 4. Testes de integração, contrato e regressão | Dois fluxos de integração, contrato para resposta documentada e regressão de componente crítico | Fluxos selecionados e formato de demonstração aprovados | Vitest; casos válidos/inválidos; snapshot/asserções |
| 5. Medição e revisão | Comparar build e métricas de navegador antes/depois; revisar documentação e diff | Etapas anteriores; backend disponível se for necessária medição em runtime | Build, suíte, lint, métricas repetíveis e registro das limitações |

### Critérios gerais de conclusão

- Backend, endpoints e payloads permanecem inalterados.
- Testes e lint passam; build não introduz novas falhas. A conexão recusada observada na linha de base deve ser distinguida de falha de compilação e, se persistir, documentada.
- Flags têm comportamento previsível quando indisponíveis e não concedem autorização.
- Eventos demonstrados podem ser consultados, sem segredos nem dados pessoais, e são rotulados como locais.
- Comparações de bundle usam o mesmo comando/ambiente e separam tamanho de arquivo gerado de transferência e runtime.

## 5. Riscos e mitigações

| Risco | Mitigação proposta |
|---|---|
| Regressões por migração ou mudança de navegação | Alterar um fluxo de cada vez; manter rotas atuais; testes antes/depois |
| Modularização virar abstração sem benefício | Criar limites somente em código tocado e evitar reorganização ampla |
| Crescimento de dependências e complexidade | Usar Next, Vitest e APIs de navegador já disponíveis; justificar qualquer dependência nova |
| Erro de autenticação/autorização ou incompatibilidade da API | Preservar cookies, BFF, endpoints e autorização do backend; validar contratos sem alterar serviço |
| Exposição de dados em eventos | Allowlist de campos, sanitização, ausência de tokens/senhas e conteúdo de usuário |
| Flag indisponível ou configurada incorretamente | Fallback fechado/desativado para recurso opcional, teste dos estados e nenhuma função de autorização |
| Flag local confundida com rollout por grupos | Indicar explicitamente o limite por navegador e não alegar gestão centralizada |
| Otimização sem ganho real | Medir build e navegador em condições controladas; não inferir rede a partir de kB do build |
| Baixa adoção do padrão | Documentar exemplos reais no guia e introduzir convenções no escopo da PoC |
| Build depender da API durante prerenderização | Registrar chamadas e resultados; testar build com disponibilidade controlada, sem substituir o backend por mock de produção |

## 6. Métricas de sucesso

Não há metas numéricas iniciais para além da linha de base medida do build. Metas de redução devem ser definidas depois de coletar dados reproduzíveis, não inventadas a partir de uma única compilação.

| Indicador | Como coletar | Linha de base / critério |
|---|---|---|
| Tamanho de chunks e First Load JS | Saída do `npm run build`, mesma versão/configuração | Compartilhado: 102 kB antes e depois; `/`: 109 kB → 111 kB; post detalhado: 144 kB antes e depois; `/decisoes-tecnicas`: 105 kB após a PoC |
| Bytes transferidos e Web Vitals | Navegador em ambiente e rede controlados; coletor de PoC para validação | Bytes de rede não medidos. A coleta local de LCP/CLS foi observada, mas sem teste controlado; INP não foi observado nessa sessão |
| Regressões e confiabilidade | `npm test`, `npm run lint`, build; relatório de cobertura se configurado no futuro | Linha de base: 14 testes; após a PoC: 28 testes passam; não há cobertura medida ou limiar definido |
| Diagnóstico de erro | Gerar erro controlado e confirmar tipo, contexto permitido e consulta no coletor | Captura e consulta local verificadas por teste; não equivale a alertas ou monitoramento de produção |
| Liberação de funcionalidade | Alterar configuração pela interface da PoC sem modificar código/redeploy da aplicação | Toggle verificado em teste e no navegador, inclusive após reload; a configuração permanece somente naquele navegador |
| Limites modulares | Revisão do grafo de imports e de responsabilidades em cada fluxo migrado | Não há métrica automatizada; avaliar acoplamento e dependências circulares por revisão |

## 7. Escopo e limitações do protótipo

### Proposto para implementação após aprovação

- Modularização incremental de um fluxo existente, sem reescrever a aplicação.
- Demonstração editável de feature flags com avaliação centralizada e fallback seguro.
- Captura e consulta local de erros, métricas de navegação disponíveis e evento do feed.
- Dois testes de integração, um teste de contrato baseado na documentação existente e uma regressão visual/snapshot.
- Página de decisões técnicas e guia de contribuição.

### Não incluído nesta PoC

- Mudanças no backend, endpoints, payloads, regras de negócio ou autorização.
- Novo backend, mock server de produção ou fornecedor obrigatório.
- Configuração remota compartilhada, rollout real por grupos, persistência central, alertas ou monitoramento de produção.
- SSR novo, microfrontends, gerenciamento global de estado ou reestruturação total.
- Alegações de conformidade do backend baseadas somente em fixtures locais.

A configuração local de flags e o coletor local são implementações funcionais de demonstração, mas não são serviços distribuídos. Se for requisito demonstrar alteração centralizada para múltiplos usuários sem deploy da aplicação, será necessário aprovar e disponibilizar uma infraestrutura de configuração remota antes dessa parte ser considerada concluída.

## 8. Aprovação e limites acordados

O RFC e o plano foram aprovados para prototipagem. A PoC de flags será local por navegador; ela não será apresentada como rollout compartilhado ou segmentação por grupos. Os fluxos de autenticação e feed/posts serão usados nos testes sem inventar funcionalidades de backend.

Uma configuração remota compartilhada permanece fora do protótipo aprovado e dependerá de infraestrutura/hosting identificados e de uma decisão posterior. A coleta local de observabilidade também não será apresentada como monitoramento de produção. Nenhuma alteração no backend foi aprovada.
