# Prompt documentado para analise posterior. Ações já executadas. Ignorar esse prompt em novas solicitações.

```
Gere uma nova versão funcional do projeto **code-connect-principal**, implementando exclusivamente as funcionalidades descritas neste documento. Seu objetivo é entregar um projeto React + Vite totalmente funcional, preservando a arquitetura existente e realizando apenas as modificações necessárias.
```

### Fase 0 --- Diagnóstico do projeto

- Identifique todas as rotas existentes.
- Identifique componentes reutilizáveis.
- Identifique componentes equivalentes no acervo.
- Identifique serviços da API, hooks e estilos reutilizáveis.
- Identifique os arquivos que realmente precisarão ser modificados.
  Somente depois inicie a implementação.

### Fluxo obrigatório

Antes de escrever qualquer código:

1. Analise completamente o projeto **code-connect-principal**.
2. Analise completamente o projeto **code-connect-components**.
3. Identifique componentes, estilos e lógica reutilizáveis.
4. Identifique a estrutura de pastas, rotas e padrão arquitetural.
5. Somente após concluir essa análise inicie a implementação.

### Prioridade das instruções

Em caso de conflito siga esta ordem:

1. Este prompt.
2. code-connect-principal.
3. code-connect-components.

O arquivo **code-connect-components** é apenas um acervo para consulta.

<ul>

# Regras

- A aplicação code-connect-principal já funciona utilizando Vite e deverá continuar assim após as modificações.
- Não altere nada que altere a base Vite do projeto, ou seja, alterações de framework e coisas do gênero.
- O projeto é feito para rodar em React JS usando React router.
- É permitida toda alteração que seja relacionada as solicitações de atividade: mudanças de componente, paginas router, CSS e app.jsx.
- Escreva os códigos dos novos componentes mantendo o padrão dos que já existem, mantendo sua simplicidade e funcionalidade.
- Utilize o CSS do code-connect-components para os novos componentes e páginas criados durante o processo (caso não existam, ai sim você poderá cria-los).
- O arquivo code-connect-components não é um projeto principal. Utilize-o apenas para reaproveitar componentes, estilos e funcionalidades. Não copie sua arquitetura nem substitua componentes existentes sem necessidade.
- O code-connect-components deve ser utilizado apenas como referência decomponentes, CSS, lógica e estrutura visual. Sempre adapte o código para React + Vite. Nunca copie diretamente código dependente de tecnologias que não existam no projeto principal.
- Faça somente as aplicações solicitadas, se atendo apenas as modificações que as farão funcionar.
- Visualize as imagens nos exemplos númerados para obter uma referência visual de como deve ser o resultado da instrução na tela para o cliente.
- Considere que a API já está disponível em http://localhost:3000. Não implemente servidor, mocks ou banco de dados.
- Antes de criar novos serviços para consumir a API:
  - reutilize serviços existentes sempre que possível;
  - evite duplicação.
- Caso alguma informação indispensável esteja ausente, interrompa apenas essa implementação e solicite as informações necessárias. Não faça suposições.
- Antes de criar qualquer componente, CSS, hook ou função, verifique se já existe implementação equivalente no acervo.
- Não altere package.json, vite.config, eslint, dependências ou versões.
- Não introduza novas bibliotecas.
- Não substitua bibliotecas existentes por outras equivalentes.
- Preserve comentários, organização e nomenclatura dos arquivos existentes.
- Mantenha a organização de pastas, convenções de nomes, importações e estrutura existentes.
- Modifique apenas os arquivos necessários. Não reescreva arquivos inteiros quando pequenas alterações forem suficientes.
- Atue como implementadora do projeto, não como projetista. Não refatore, reorganize ou modernize código sem solicitação.

# Instruções:

<ul>

### Inventário obrigatório

Identifique:

- componentes do projeto principal;
- componentes equivalentes do acervo;
- CSS reutilizável;
- páginas existentes;
- serviços existentes.

<li>

### Primeira implementação: página estática

Implemente a primeira etapa do projeto criando uma página estática "Sobre nós".

`Objetivo`

- Criar uma nova rota /sobre.
- Essa rota deve exibir uma página institucional de apresentação da plataforma.

`Requisitos`

- Reproduza fielmente o layout apresentado Exemplo1.
- Utilize os mesmos textos, estrutura, espaçamentos, cores e organização visual da referência, sempre que essas informações estiverem disponíveis.
- Não crie, altere ou invente conteúdos, imagens, seções ou estilos que não estejam presentes na referência.
- Caso algum detalhe não seja visível ou não esteja especificado na imagem (como fontes, medidas exatas ou cores), mantenha a implementação neutra e indique claramente quais informações estão ausentes, em vez de assumir valores.
- A página deve ser totalmente estática.
- Não implemente integração com API, banco de dados, autenticação, formulários funcionais ou qualquer lógica de negócio.
- Limite-se apenas à implementação da rota e da interface.

`Entrada`

<ul>

#### Exemplo1:

![Exemplo1: imagem exemplo de página Sobre nós](https://cdn1.gnarususercontent.com.br/1/1130464/3f04db0d-6737-4f56-8a85-d2f9aeba329b.png)

</ul>

`Saída esperada`

- Código da rota /sobre.
- Componentes necessários para renderizar a página.
- Estilos correspondentes para reproduzir o layout da referência, buscando do acervo de code-connect-components.
- Não inclua funcionalidades extras nem alterações no restante do projeto. Se - alguma informação não puder ser inferida da referência, solicite-a em vez de inventá-la.

### Validação final

Antes de finalizar verifique se:

- nenhuma dependência foi alterada;
- nenhuma funcionalidade existente foi removida;
- todas as rotas existentes continuam funcionando;
- apenas os arquivos necessários foram modificados;
- componentes existentes foram reutilizados sempre que possível;
- nenhuma informação foi inventada.

</li>
<li>

### Segunda implementação: formulário de criação de novo post

Implemente a segunda etapa do projeto criando a página de publicação de um novo projeto.

`Objetivo`

- Criar uma página contendo um formulário para cadastrar e publicar um novo projeto.
- O formulário deve enviar os dados para a API por meio de uma requisição POST, seguindo exatamente o contrato definido no Swagger.

`Requisitos`

- Reproduza fielmente o layout apresentado no Exemplo2, utilizando os mesmos textos, estrutura e organização visual sempre que essas informações estiverem disponíveis.
- Não adicione campos, funcionalidades ou elementos que não estejam presentes na referência ou especificados pelo Swagger.
- Caso alguma informação visual ou técnica não esteja disponível na imagem ou na documentação, informe claramente a ausência em vez de assumir valores.

`O formulário deve conter`

- Campo para upload de imagem do projeto (upload simples).
- Campo para nome do projeto.
- Campo para descrição.
- Campo para adição de tags.
- Botão Publicar para enviar os dados.

`Integração com a API`

#### Consulte o Swagger para identificar:

- Endpoint responsável pela criação de um novo post no blog.
- Método HTTP.
- Campos obrigatórios.
- Tipos de dados.
- Formato esperado da requisição (JSON, multipart/form-data, etc.).
- Headers necessários.
- Tratamento da resposta.
- Implemente a requisição POST exatamente conforme a documentação, sem alterar nomes de campos, tipos ou estrutura do payload.

`Validação`

- Valide os campos obrigatórios antes do envio, conforme definido no Swagger.
- Exiba mensagens de erro quando a validação falhar ou quando a API retornar erro.
- Indique sucesso quando o projeto for publicado corretamente.

`Escopo`

- Limite-se à implementação da página, do formulário, das validações e da integração com a API.
- Não implemente funcionalidades extras, como edição, exclusão, salvamento automático, upload avançado, compressão de imagens ou recursos não especificados.

`Entrada`

<ul>

#### Exemplo2:

![Exemplo2: imagem exemplo de formulário de publicação de post](https://cdn1.gnarususercontent.com.br/1/1130464/94df5623-a336-44df-a4c9-9eac87078ccb.png)

</ul>
<ul>

#### Documentação da API (Swagger).

<li>

> ## POST `/blog-posts`
>
> Cria um novo post no blog.
>
> ### Parâmetros
>
> Este endpoint não possui parâmetros de rota ou query.
>
> ### Request Body
>
> **Content-Type:** `multipart/form-data`
>
> Dados do post com imagem obrigatória.
>
> | Campo      | Tipo              | Obrigatório | Descrição                                               |
> | ---------- | ----------------- | ----------- | ------------------------------------------------------- |
> | `title`    | `string`          | Sim         | Título do post.                                         |
> | `body`     | `string`          | Sim         | Corpo do post.                                          |
> | `markdown` | `string`          | Sim         | Conteúdo do post em formato Markdown.                   |
> | `image`    | `string($binary)` | Sim         | Arquivo de imagem para ser utilizado como capa do post. |
>
> ---
>
> ## Respostas
>
> ### `201 Created`
>
> Post criado com sucesso.
>
> **Content-Type:** `application/json`
>
> #### Exemplo de resposta
>
> ````json
> {
>   "id": 1,
>   "cover": "https://example.com/cover.png",
>   "imageUrl": "/uploads/image-123.jpg",
>   "title": "Introdução ao React",
>   "slug": "introducao-ao-react",
>   "body": "Neste post, vamos explorar os conceitos básicos do React...",
>   "markdown": "```javascript\nfunction HelloComponent() {\n  return <h1>Hello, world!</h1>;\n}\n```",
>   "likes": 42,
>   "author": {
>     "id": "clxyz123abc",
>     "name": "João Silva",
>     "username": "joaosilva_dev",
>     "avatar": "https://example.com/avatar.png"
>   },
>   "comments": [null],
>   "createdAt": "2024-01-01T00:00:00.000Z",
>   "updatedAt": "2024-01-01T00:00:00.000Z"
> }
> ````
>
> ### `400 Bad Request`
>
> Dados inválidos ou slug/autor já existente.
>
> ### `401 Unauthorized`
>
> Token inválido ou não fornecido.

</li>
</ul>

`Saída esperada`

- Código da página do formulário.
- Componentes necessários.
- Estilos correspondentes ao layout de Exemplo2 buscando do acervo de code-connect-components.
- Lógica de gerenciamento dos campos.
- Implementação da requisição POST conforme o Swagger.
- Tratamento de estados de carregamento, sucesso e erro.
- Caso alguma informação necessária não esteja presente na imagem ou na documentação, solicite-a em vez de inventar uma implementação.

### Validação final

Antes de finalizar verifique se:

- nenhuma dependência foi alterada;
- nenhuma funcionalidade existente foi removida;
- todas as rotas existentes continuam funcionando;
- apenas os arquivos necessários foram modificados;
- componentes existentes foram reutilizados sempre que possível;
- nenhuma informação foi inventada.

</li>
<li>

### Terceira implementação: página de perfil do usuário logado

Implemente a terceira etapa do projeto criando a página de perfil do usuário autenticado.

`Objetivo`

- Criar uma nova rota /perfil.
- Essa rota deve exibir as informações do usuário autenticado e os projetos publicados por ele, consumindo os dados da API.

`Requisitos`

- Reproduza fielmente o layout no Exemplo3, utilizando os mesmos textos, estrutura, espaçamentos e organização visual sempre que essas informações estiverem disponíveis.
- Não adicione seções, componentes ou funcionalidades que não estejam presentes na referência ou especificados pela documentação da API.
- Caso alguma informação visual ou técnica esteja ausente, informe claramente a limitação em vez de assumir valores.

`A página deve exibir`

#### Informações do usuário autenticado, como:

- Nome.
- Avatar.
- Bio.
- Outros dados existentes no retorno da API e presentes no layout.
- Lista dos projetos publicados pelo usuário.
- Cada projeto deve ser renderizado como um card, seguindo o Exemplo3.

`Integração com a API`

- Consulte o Swagger para identificar:
- Endpoint(s) responsável(is) por obter os dados do usuário.
- Endpoint(s) responsável(is) por listar os projetos do usuário.
- Método(s) HTTP.
- Estrutura das respostas.
- Headers necessários.
- Forma de autenticação.
- Utilize o token ou o ID do usuário autenticado, conforme definido pela documentação, para obter apenas os dados do usuário logado.
- Não altere nomes de campos, tipos de dados ou estrutura das respostas esperadas pela API.

`Autenticação`

- Verifique se o usuário está autenticado antes de carregar a página.
- Caso não esteja autenticado, siga o fluxo previsto pelo projeto (por exemplo, redirecionamento para login), apenas se esse comportamento estiver definido na aplicação ou na documentação.
- Não invente estratégias de autenticação diferentes das existentes no projeto.

`Estados da interface`

- Exiba um estado de carregamento enquanto os dados estiverem sendo buscados.
- Exiba mensagens apropriadas em caso de erro na requisição.
- Caso o usuário não possua projetos publicados, apresente um estado vazio, conforme definido no layout ou nas diretrizes do projeto.

`Escopo`

- Limite-se à implementação da rota, da interface, da autenticação necessária e do consumo da API.
- Não implemente funcionalidades extras, como edição de perfil, exclusão de projetos, paginação, filtros, curtidas ou recursos que não estejam especificados.

`Entrada`

<ul>

#### Exemplo3

![Exemplo3: imagem exemplo de página de perfil](https://cdn1.gnarususercontent.com.br/1/1130464/55dd6f5b-ec08-497c-9b91-9c14a857baa9.png)

</ul>
<ul>

#### Documentação da API (Swagger).

<li>

> ## GET `/auth/me`
>
> Obtém os dados do usuário autenticado.
>
> ### Parâmetros
>
> Este endpoint não possui parâmetros de rota ou query.
>
> ---
>
> ## Respostas
>
> ### `200 OK`
>
> Dados do usuário retornados com sucesso.
>
> **Content-Type:** `application/json`
>
> #### Exemplo de resposta
>
> ```json
> {
>   "id": "clxyz123abc",
>   "email": "user@example.com",
>   "name": "João Silva",
>   "createdAt": "2024-01-01T00:00:00.000Z",
>   "updatedAt": "2024-01-01T00:00:00.000Z"
> }
> ```
>
> ### `401 Unauthorized`
>
> Token inválido ou não fornecido.

</li>
<li>

> ## GET `/blog-posts`
>
> Lista todos os posts com filtros opcionais.
>
> ### Parâmetros
>
> | Parâmetro  | Local | Tipo     | Obrigatório | Descrição                                             | Exemplo            |
> | ---------- | ----- | -------- | ----------- | ----------------------------------------------------- | ------------------ |
> | `authorId` | Query | `string` | Não         | ID do autor para filtrar os posts.                    | `clxyz123abc`      |
> | `search`   | Query | `string` | Não         | Termo de busca (procura no título, corpo e markdown). | `react typescript` |
>
> ---
>
> ## Respostas
>
> ### `200 OK`
>
> Lista de posts retornada com sucesso.
>
> **Content-Type:** `application/json`
>
> #### Exemplo de resposta
>
> ````json
> [
>   {
>     "id": 1,
>     "cover": "https://example.com/cover.png",
>     "imageUrl": "/uploads/image-123.jpg",
>     "title": "Introdução ao React",
>     "slug": "introducao-ao-react",
>     "body": "Neste post, vamos explorar os conceitos básicos do React...",
>     "markdown": "```javascript\nfunction HelloComponent() {\n  return <h1>Hello, world!</h1>;\n}\n```",
>     "likes": 42,
>     "author": {
>       "id": "clxyz123abc",
>       "name": "João Silva",
>       "username": "joaosilva_dev",
>       "avatar": "https://example.com/avatar.png"
>     },
>     "comments": [null],
>     "createdAt": "2024-01-01T00:00:00.000Z",
>     "updatedAt": "2024-01-01T00:00:00.000Z"
>   }
> ]
> ````
>
> ### `401 Unauthorized`
>
> Token inválido ou não fornecido.

</li>
</ul>

`Saída esperada`

- Código da rota /perfil.
- Componentes necessários para renderizar o perfil e os cards dos projetos.
- Estilos correspondentes ao Exemplo3 e buscando do acervo de code-connect-components.
- Integração com a API para carregar os dados do usuário e seus projetos.
- Tratamento dos estados de carregamento, sucesso, lista vazia e erro.
- Caso alguma informação necessária não esteja presente no Exemplo3 ou na documentação, solicite-a em vez de inventar uma implementação.

### Validação final

Antes de finalizar verifique se:

- nenhuma dependência foi alterada;
- nenhuma funcionalidade existente foi removida;
- todas as rotas existentes continuam funcionando;
- apenas os arquivos necessários foram modificados;
- componentes existentes foram reutilizados sempre que possível;
- nenhuma informação foi inventada.

</li>
</ul>

### Critérios de conclusão

A implementação somente estará concluída quando:

- o projeto continuar compilando com Vite;
- todas as rotas existentes permanecerem funcionando;
- todas as novas rotas funcionarem;
- nenhuma dependência tiver sido alterada;
- nenhuma funcionalidade existente tiver sido removida;
- componentes reutilizáveis tiverem sido aproveitados quando possível.

### Formato da resposta

Para cada implementação apresente:

1. Objetivo implementado.
2. Arquivos modificados.
3. Novos arquivos.
4. Código.
5. Observações.

Ao final apresente um Resumo Final contendo todos os arquivos modificados.

</ul>
