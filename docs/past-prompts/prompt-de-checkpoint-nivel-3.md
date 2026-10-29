# Prompt documentado para analise posterior. Ações já executadas. Ignorar esse prompt em novas solicitações.

# Projeto CodeConnect — Evolução arquitetural do Frontend React

## 1. Seu papel e objetivo

Atue como uma pessoa desenvolvedora sênior especializada em React, arquitetura frontend, performance, testes automatizados, observabilidade e engenharia de software.

Você é responsável por analisar o frontend existente do CodeConnect, propor uma evolução arquitetural e implementar um protótipo funcional que demonstre as decisões tomadas.

Não trate este trabalho como um projeto novo. O CodeConnect já está em desenvolvimento durante as aulas e possui código, decisões, dependências e integrações que precisam ser preservados sempre que possível.

Trabalhe em conjunto comigo: investigue o contexto, apresente alternativas, explique os trade-offs e peça minha opinião quando houver dúvidas relevantes ou decisões arquiteturais que precisem de alinhamento.

Você deve ser proativo na análise e na execução, mas não deve tomar decisões irreversíveis ou realizar alterações abrangentes sem aprovação.

## 2. Contexto e problemas que queremos resolver

O CodeConnect está evoluindo de um projeto individual para uma aplicação que precisa suportar crescimento, múltiplas pessoas desenvolvedoras e entregas frequentes.

Os principais problemas que orientam este trabalho são:

### 2.1. Acoplamento entre funcionalidades

Alterações em uma área podem causar regressões em outras. Precisamos de limites modulares claros, responsabilidades bem definidas e testes que detectem problemas de integração.

### 2.2. Performance e tamanho do bundle

O carregamento inicial está ficando mais lento à medida que a aplicação cresce. Precisamos investigar a configuração atual, identificar oportunidades reais de otimização e adotar uma estratégia consistente de carregamento de código.

### 2.3. Falta de observabilidade

Precisamos ter mecanismos para identificar erros no frontend, acompanhar métricas de experiência do usuário e registrar eventos relevantes para o negócio.

### 2.4. Liberação de funcionalidades

Precisamos demonstrar como funcionalidades podem ser liberadas gradualmente ou para grupos específicos de usuários, reduzindo o risco de releases.

### 2.5. Processo de desenvolvimento e manutenção

Precisamos de testes adequados, documentação arquitetural, padrões consistentes e orientações que facilitem a contribuição de outras pessoas desenvolvedoras.

Esses problemas são hipóteses de trabalho derivadas do desafio acadêmico. Investigue o código existente antes de afirmar que todos eles já se manifestam da forma descrita.

## 3. Restrições obrigatórias

### 3.1. O backend está fora do escopo inicial

O backend existente deve ser considerado uma dependência que será preservada.

- Não altere arquivos, configurações, contratos ou lógica do backend nesta primeira etapa.
- Não migre o backend para outra tecnologia.
- Não substitua a API real por um mock server como solução definitiva.
- Não altere endpoints, payloads, autenticação ou regras de negócio existentes sem minha autorização explícita.
- Utilize as integrações já disponíveis e respeite os contratos atuais.
- Caso identifique limitações no backend que afetem o frontend, documente-as e proponha alternativas sem modificar o backend.

Se for necessário criar mocks para testes, utilize-os de forma isolada, sem substituir o comportamento normal da aplicação.

### 3.2. Respeite o projeto existente

Antes de escolher tecnologias ou modificar código:

- Identifique o framework, as bibliotecas, o gerenciador de pacotes, os comandos e a estrutura atual.
- Preserve as convenções existentes quando forem adequadas.
- Evite instalar novas dependências sem justificar sua necessidade.
- Não introduza uma nova arquitetura, biblioteca ou ferramenta apenas por preferência pessoal.
- Não reescreva funcionalidades existentes que não precisem ser modificadas.
- Preserve alterações locais, arquivos não commitados e trabalho de outras pessoas.
- Não reverta nem sobrescreva alterações preexistentes.
- Não execute commits, pushes, merges ou operações destrutivas sem minha autorização.

Se o repositório contiver múltiplas aplicações ou pastas de backend e frontend, identifique corretamente o escopo antes de executar comandos ou alterar arquivos.

### 3.3. Transparência técnica

Diferencie sempre:

- O que foi observado diretamente no código.
- O que foi medido por ferramentas.
- O que é uma hipótese.
- O que é uma proposta arquitetural.
- O que foi efetivamente implementado e validado.

Não invente métricas, resultados de testes, medições de performance ou integrações que não foram executadas.

## 4. Fluxo obrigatório de trabalho

O trabalho deverá ser dividido nas fases abaixo.

**Regra principal:** antes de implementar mudanças arquiteturais, conclua a análise inicial, elabore o RFC e apresente o plano para minha aprovação.

Não comece a implementar todas as funcionalidades enquanto ainda estiver decidindo a arquitetura.

### Fase 1 — Inspeção e diagnóstico

Analise o repositório sem modificar arquivos.

Investigue:

1. Estrutura de diretórios e separação entre frontend e backend.
2. Framework, versão do React, ferramenta de build e gerenciador de pacotes.
3. Rotas existentes, navegação e estratégia de renderização.
4. Organização de componentes, hooks, serviços, estado global e funcionalidades.
5. Integrações com a API, autenticação e tratamento de erros.
6. Configuração de testes e cobertura existente.
7. Configuração de build, divisão de chunks e dependências de maior impacto.
8. Existência de logs, métricas, monitoramento ou ferramentas de observabilidade.
9. Fluxo atual de configuração e liberação de funcionalidades.
10. Documentação existente e convenções de contribuição.

Execute os comandos de diagnóstico apropriados ao projeto, como testes existentes, build e análise do bundle, quando disponíveis e seguros.

Não instale dependências nem altere configurações somente para realizar o diagnóstico.

Se um comando não existir, falhar ou não produzir os dados necessários, informe a limitação e avalie alternativas compatíveis com o projeto.

#### Entregável da fase 1

Apresente um relatório conciso com:

- Arquitetura e tecnologias identificadas.
- Principais arquivos e módulos relevantes.
- Estado atual dos requisitos do desafio.
- Problemas efetivamente identificados.
- Métricas iniciais disponíveis.
- Restrições e dependências relevantes.
- Dúvidas que precisam ser respondidas antes de definir a solução.

Ao terminar, prossiga para a elaboração do RFC, sem implementar mudanças.

### Fase 2 — RFC arquitetural

Crie um documento técnico chamado `RFC.md`, preferencialmente em uma pasta de documentação já existente. Caso não exista uma convenção para isso, proponha um local e explique sua escolha.

O RFC deverá ser claro, objetivo e compreensível por pessoas desenvolvedoras de diferentes níveis, pelo time de produto e pela liderança técnica.

Inclua as seguintes seções:

#### 2.1. Contexto e motivação

Descreva o estado atual do projeto com base na inspeção realizada e explique quais problemas justificam a evolução arquitetural.

Não apresente suposições como fatos.

#### 2.2. Proposta arquitetural

Descreva a arquitetura proposta, incluindo:

- Organização de pastas e módulos.
- Limites entre funcionalidades e responsabilidades.
- Estratégia de dependências e comunicação entre módulos.
- Organização de componentes, hooks, serviços e estado.
- Estratégia de navegação e renderização.
- Tratamento de erros e comunicação com a API.
- Estratégia de testes e observabilidade.
- Estratégia de feature flags.

Para cada decisão relevante, explique como ela resolve um problema identificado.

Não presuma que microfrontends, gerenciamento global de estado, SSR ou outras tecnologias adicionais são necessários. Avalie essas alternativas somente se fizerem sentido para o contexto real do projeto.

#### 2.3. Alternativas consideradas

Para as decisões mais importantes, compare alternativas viáveis.

Explique os benefícios, custos, limitações e motivos para escolher ou descartar cada opção.

#### 2.4. Plano de migração incremental

Organize a evolução em etapas pequenas, priorizadas por risco, impacto e esforço.

O plano deve permitir que o restante da aplicação continue funcionando durante a migração.

Indique dependências entre etapas, critérios de conclusão e formas de validar que cada mudança não causou regressões.

#### 2.5. Riscos e mitigações

Considere riscos como:

- Regressões funcionais.
- Aumento de complexidade.
- Dependências adicionais.
- Problemas de autenticação ou autorização.
- Alterações incompatíveis com a API existente.
- Exposição de dados sensíveis em logs.
- Feature flags configuradas incorretamente.
- Ganhos de performance insuficientes.
- Dificuldades de manutenção e adoção pelo time.

#### 2.6. Métricas de sucesso

Defina indicadores mensuráveis e formas de obtê-los.

Considere, quando aplicável:

- Tamanho total do bundle inicial e dos chunks.
- Número e tamanho dos chunks carregados inicialmente.
- Tempo de carregamento e métricas Web Vitals.
- Cobertura e confiabilidade dos testes.
- Capacidade de detectar e investigar erros.
- Tempo e segurança necessários para liberar ou desativar funcionalidades.
- Clareza dos limites entre módulos.

Quando não houver uma medição inicial disponível, defina como ela será coletada. Não invente valores de referência.

#### 2.7. Escopo e limitações do protótipo

Identifique quais decisões serão implementadas nesta etapa, quais serão demonstradas por uma prova de conceito e quais permanecerão como recomendações futuras.

Diferencie claramente uma implementação funcional de uma simulação.

### Fase 3 — Revisão e aprovação do plano

Depois de preparar o RFC e o plano de execução:

1. Apresente as principais decisões e alternativas.
2. Mostre quais arquivos pretende criar ou modificar.
3. Explique a ordem de implementação e os critérios de conclusão.
4. Identifique dependências, riscos e decisões que exigem minha participação.
5. Pergunte sobre pontos que realmente não possam ser resolvidos com as informações disponíveis.

**Pare e aguarde minha aprovação explícita antes de implementar o protótipo ou modificar arquivos de código.**

Se eu solicitar alterações ao RFC, revise o documento e reapresente as decisões afetadas.

Não interprete a autorização para elaborar o RFC como autorização automática para implementar todas as mudanças.

## 5. Protótipo arquitetural

Após minha aprovação do RFC e do plano, implemente um protótipo funcional que demonstre as decisões selecionadas.

A implementação deve ser incremental, compatível com o projeto existente e limitada ao frontend.

### 5.1. Estrutura modular

Implemente uma organização que torne os limites entre funcionalidades claros.

Considere:

- Separação por funcionalidade ou domínio.
- Responsabilidades bem definidas.
- Convenções de nomenclatura.
- Organização de componentes, hooks e serviços.
- Interfaces explícitas entre módulos.
- Estratégia consistente de exports.
- Prevenção de dependências circulares e acoplamento desnecessário.

Barrel exports podem ser utilizados quando fizerem sentido, mas não são obrigatórios.

Não reorganize toda a aplicação apenas para padronizar sua estrutura. Migre os módulos necessários para demonstrar a arquitetura aprovada.

### 5.2. Code splitting e performance

Implemente uma estratégia de carregamento adequada à ferramenta de build e à navegação existentes.

Inclua:

- Lazy loading das rotas quando suportado pela arquitetura.
- Separação de código em chunks.
- Tratamento dos estados de carregamento e erro.
- Priorização do conteúdo crítico.
- Investigação de dependências pesadas e oportunidades reais de redução do bundle.

Colete métricas antes e depois usando as ferramentas disponíveis.

Diferencie o tamanho dos arquivos gerados, o tamanho transferido pela rede e o comportamento observado em execução. Não trate essas medidas como equivalentes.

Se a comparação real não puder ser feita, documente a limitação e forneça uma estimativa claramente identificada como tal.

### 5.3. Feature flags

Implemente uma prova de conceito integrada à aplicação que demonstre como controlar a liberação de funcionalidades.

A solução deve considerar:

- Ativação e desativação de funcionalidades.
- Um ponto centralizado e documentado de avaliação das flags.
- Integração com componentes ou rotas.
- Comportamento seguro quando a configuração estiver indisponível.
- Testes para os diferentes estados.
- Uma forma demonstrável de alterar a configuração sem modificar o código da funcionalidade.

O requisito acadêmico é controlar funcionalidades sem exigir deploy a cada alteração de configuração. Portanto, uma flag hardcoded ou alterada diretamente no código-fonte não satisfaz, sozinha, esse requisito.

Investigue se o projeto já possui algum serviço de configuração remota ou infraestrutura adequada. Se não possuir, proponha uma alternativa compatível com as restrições do backend e apresente suas limitações.

Não crie um backend novo nem altere o backend existente para implementar essa PoC sem minha autorização.

**Segurança:** feature flags no frontend controlam a experiência visual, mas não substituem autorização no servidor. Não exponha segredos nem permita que flags concedam acesso a dados ou operações que o usuário não esteja autorizado a executar.

### 5.4. Observabilidade no frontend

Implemente ou simule, de maneira claramente documentada, uma integração de observabilidade que contemple:

- Captura de erros não tratados.
- Coleta de métricas Web Vitals.
- Registro de pelo menos um evento de negócio, como o tempo entre o início da navegação e a exibição do primeiro post do feed.
- Uma forma de consultar ou visualizar os eventos coletados.

Priorize uma integração real com uma ferramenta já disponível no projeto, se existir.

Se for necessário criar um adaptador ou uma implementação simulada, mantenha a interface preparada para uma integração real futura e documente as diferenças.

Não considere `console.log` isolado uma solução completa de observabilidade.

Evite enviar tokens, senhas, dados pessoais ou conteúdo sensível para logs. Considere amostragem, custos e impacto da instrumentação no desempenho.

Não declare que os eventos são monitorados em produção se eles estiverem sendo apenas registrados localmente ou em memória.

### 5.5. Testes de integração e contrato

Implemente pelo menos:

- Dois testes de integração que validem fluxos completos e relevantes.
- Um teste de contrato que valide o formato esperado de uma resposta da API.
- Um teste de regressão visual ou snapshot de um componente crítico.

Os testes de integração devem utilizar os componentes e as integrações reais do frontend sempre que apropriado, isolando dependências externas somente quando necessário.

Escolha fluxos compatíveis com as funcionalidades existentes. Login, navegação para rotas protegidas e carregamento do feed são exemplos, não requisitos para inventar funcionalidades que não existam.

Para o teste de contrato:

- Utilize os contratos reais disponíveis, incluindo documentação Swagger/OpenAPI, schemas ou tipos existentes.
- Verifique os campos e tipos relevantes.
- Considere respostas inválidas e casos de erro.
- Não altere o backend.
- Não trate a validação de um mock isolado como prova de que o backend real respeita o contrato.

Para o teste de regressão visual, siga as ferramentas já adotadas pelo projeto. Se não houver infraestrutura adequada, explique o custo de introduzi-la e proponha uma alternativa antes de adicionar novas dependências.

Priorize assertions explícitas sobre comportamentos relevantes, utilizando snapshots somente quando agregarem valor.

Execute os testes após cada etapa e corrija regressões introduzidas pelo trabalho.

## 6. Rota /decisões-técnicas

Crie uma rota navegável chamada `/decisões-técnicas`, ou uma variação compatível com as convenções de URLs do projeto, que funcione como um registro de decisões arquiteturais simplificado.

A página deve apresentar as decisões relevantes tomadas durante a implementação.

Para cada decisão, registre:

- **Decisão:** o que foi escolhido.
- **Contexto:** qual problema ou necessidade motivou a escolha.
- **Alternativas:** quais opções relevantes foram consideradas.
- **Consequências:** benefícios, custos e limitações.
- **Status:** proposta, experimental, provisória ou aceita.
- **Data:** quando a decisão foi registrada, se houver uma convenção apropriada.

A página deve ser legível, navegável e integrada ao sistema de rotas existente.

Não registre como definitiva uma decisão que ainda dependa de aprovação ou validação.

Mantenha o conteúdo alinhado com o RFC e com as decisões efetivamente implementadas. Não crie registros fictícios para preencher a página.

## 7. Guia de contribuição — CONTRIBUTING.md

Crie ou atualize um `CONTRIBUTING.md` na localização apropriada do repositório.

O documento deverá explicar:

1. Objetivo e organização do projeto.
2. Tecnologias, dependências e comandos relevantes.
3. Estrutura de diretórios e responsabilidades de cada área.
4. Convenções de código e nomenclatura.
5. Como criar um novo componente, hook ou serviço.
6. Como integrar funcionalidades à API existente.
7. Regras para escrever, organizar e executar testes.
8. Critérios para revisar um Pull Request.
9. Cuidados com performance, tratamento de erros, logs e dados sensíveis.
10. Uso e manutenção de feature flags.
11. Como registrar ou propor decisões arquiteturais.

As instruções devem refletir o código real. Não documente comandos, pastas ou convenções que não existam ou não tenham sido implementados.

Evite criar regras excessivamente rígidas sem justificativa. O objetivo é facilitar a colaboração e a manutenção.

## 8. Validação e critérios de conclusão

Ao concluir cada etapa de implementação:

1. Execute os testes relevantes.
2. Execute o build quando apropriado.
3. Verifique se as rotas e funcionalidades afetadas continuam funcionando.
4. Revise os arquivos alterados para detectar mudanças não relacionadas.
5. Compare as métricas com a linha de base, quando aplicável.
6. Documente falhas, limitações e itens pendentes.

Ao final, execute a suíte de testes e o build disponíveis, sem modificar o backend.

Apresente um relatório contendo:

- Decisões arquiteturais implementadas.
- Arquivos criados e modificados.
- Resultado dos testes e do build.
- Métricas reais de performance antes e depois, quando disponíveis.
- Funcionamento demonstrado das feature flags.
- Eventos de observabilidade efetivamente capturados.
- Testes de integração, contrato e regressão implementados.
- Documentação produzida.
- Limitações e riscos restantes.
- Diferenças entre o que foi proposto no RFC e o que foi efetivamente implementado.
- Próximas etapas recomendadas.

Não declare um requisito como concluído se ele tiver sido apenas documentado ou simulado.

## 9. Critérios de decisão

Durante todo o trabalho:

- Prefira soluções simples, justificáveis e compatíveis com o projeto.
- Priorize os problemas de maior impacto em vez de tentar implementar todas as tecnologias possíveis.
- Avalie custos de manutenção e complexidade, além dos benefícios técnicos.
- Evite refatorações abrangentes sem necessidade.
- Preserve a compatibilidade com o backend existente.
- Utilize evidências do código e medições para sustentar as decisões.
- Quando houver dúvidas relevantes, faça perguntas objetivas e apresente alternativas.
- Quando houver informação suficiente, tome decisões técnicas justificáveis e explique o motivo.
- Solicite aprovação antes de mudanças fora do escopo autorizado.

O objetivo não é construir uma arquitetura teoricamente perfeita. É demonstrar uma evolução arquitetural coerente, incremental, mensurável e sustentável para o CodeConnect.

## 10. Primeira ação

Comece exclusivamente pela Fase 1: inspecione o repositório, identifique o contexto real do frontend e produza o diagnóstico inicial.

Em seguida, elabore o RFC e o plano de execução conforme a Fase 2.

Não implemente o protótipo, não altere o backend e não modifique arquivos de código antes de me apresentar as propostas e receber minha aprovação explícita.
