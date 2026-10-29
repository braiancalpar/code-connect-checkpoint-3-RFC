# Blog Posts

## GUIDE

Normalization rules:
- required/nullable are string booleans: true or false.
- path uses dot notation for objects and [] for arrays (for example: items[].id).
- type is the resolved OpenAPI field type.
- description falls back to field name when missing.

Marker semantics:
- METHOD <HTTP_METHOD> URL <PATH>: endpoint method and URL path.
- OPERATION_ID <ID>: stable operation identifier.
- RESPONSE_FIELDS_TSV: path, type, nullable, description.
- RESPONSE_TYPE <TYPE>: emitted only when RESPONSE_FIELDS_TSV is absent.

## INDEX_TSV

```tsv
n	summary	method	path	operation_id
1	Criar novo post	POST	/blog-posts	PostsController_create
2	Listar todos os posts com filtros opcionais	GET	/blog-posts	PostsController_findAll
3	Buscar post por ID	GET	/blog-posts/{id}	PostsController_findOne
4	Atualizar post (apenas o autor)	PATCH	/blog-posts/{id}	PostsController_update
5	Deletar post (apenas o autor)	DELETE	/blog-posts/{id}	PostsController_remove
6	Buscar post por slug	GET	/blog-posts/slug/{slug}	PostsController_findBySlug
7	Curtir post (incrementar likes)	POST	/blog-posts/{id}/like	PostsController_like
```

### 1. Criar novo post
METHOD POST URL /blog-posts
OPERATION_ID PostsController_create
BODY_FIELDS_TSV
```tsv
path	type	required	description
title	string	false	Título do post
body	string	false	Corpo do post
markdown	string	false	Código markdown do post
image	string	false	Arquivo de imagem para usar como capa (obrigatório)
```
RESPONSE_FIELDS_TSV
```tsv
path	type	nullable	description
id	number	false	ID único do post
cover	string	false	URL da imagem de capa do post
imageUrl	string	false	URL da imagem principal do post
title	string	false	Título do post
slug	string	false	Slug único do post
body	string	false	Corpo do post
markdown	string	false	Código markdown do post
likes	number	false	Número de likes do post
author.id	string	false	ID único do autor
author.name	string	false	Nome completo do autor
author.username	string	false	Username do autor
author.avatar	string	false	URL do avatar do autor
comments	void[][]	false	Lista de comentários do post
createdAt	string	false	Data de criação do post
updatedAt	string	false	Data da última atualização do post
```

### 2. Listar todos os posts com filtros opcionais
METHOD GET URL /blog-posts
OPERATION_ID PostsController_findAll
URL_PARAMS_TSV
```tsv
name	in	required	type	description
authorId	query	false	string	ID do autor para filtrar posts
search	query	false	string	Termo de busca (procura no título, corpo e markdown)
```
RESPONSE_FIELDS_TSV
```tsv
path	type	nullable	description
id	number	false	ID único do post
cover	string	false	URL da imagem de capa do post
imageUrl	string	false	URL da imagem principal do post
title	string	false	Título do post
slug	string	false	Slug único do post
body	string	false	Corpo do post
markdown	string	false	Código markdown do post
likes	number	false	Número de likes do post
author.id	string	false	ID único do autor
author.name	string	false	Nome completo do autor
author.username	string	false	Username do autor
author.avatar	string	false	URL do avatar do autor
comments	void[][]	false	Lista de comentários do post
createdAt	string	false	Data de criação do post
updatedAt	string	false	Data da última atualização do post
```

### 3. Buscar post por ID
METHOD GET URL /blog-posts/{id}
OPERATION_ID PostsController_findOne
URL_PARAMS_TSV
```tsv
name	in	required	type	description
id	path	true	number	ID do post
```
RESPONSE_FIELDS_TSV
```tsv
path	type	nullable	description
id	number	false	ID único do post
cover	string	false	URL da imagem de capa do post
imageUrl	string	false	URL da imagem principal do post
title	string	false	Título do post
slug	string	false	Slug único do post
body	string	false	Corpo do post
markdown	string	false	Código markdown do post
likes	number	false	Número de likes do post
author.id	string	false	ID único do autor
author.name	string	false	Nome completo do autor
author.username	string	false	Username do autor
author.avatar	string	false	URL do avatar do autor
comments	void[][]	false	Lista de comentários do post
createdAt	string	false	Data de criação do post
updatedAt	string	false	Data da última atualização do post
```

### 4. Atualizar post (apenas o autor)
METHOD PATCH URL /blog-posts/{id}
OPERATION_ID PostsController_update
URL_PARAMS_TSV
```tsv
name	in	required	type	description
id	path	true	number	ID do post
```
BODY_FIELDS_TSV
```tsv
path	type	required	description
title	string	false	Título do post
body	string	false	Corpo do post
markdown	string	false	Código markdown do post
```
RESPONSE_FIELDS_TSV
```tsv
path	type	nullable	description
id	number	false	ID único do post
cover	string	false	URL da imagem de capa do post
imageUrl	string	false	URL da imagem principal do post
title	string	false	Título do post
slug	string	false	Slug único do post
body	string	false	Corpo do post
markdown	string	false	Código markdown do post
likes	number	false	Número de likes do post
author.id	string	false	ID único do autor
author.name	string	false	Nome completo do autor
author.username	string	false	Username do autor
author.avatar	string	false	URL do avatar do autor
comments	void[][]	false	Lista de comentários do post
createdAt	string	false	Data de criação do post
updatedAt	string	false	Data da última atualização do post
```

### 5. Deletar post (apenas o autor)
METHOD DELETE URL /blog-posts/{id}
OPERATION_ID PostsController_remove
URL_PARAMS_TSV
```tsv
name	in	required	type	description
id	path	true	number	ID do post
```
RESPONSE_TYPE void

### 6. Buscar post por slug
METHOD GET URL /blog-posts/slug/{slug}
OPERATION_ID PostsController_findBySlug
URL_PARAMS_TSV
```tsv
name	in	required	type	description
slug	path	true	string	Slug do post
```
RESPONSE_FIELDS_TSV
```tsv
path	type	nullable	description
id	number	false	ID único do post
cover	string	false	URL da imagem de capa do post
imageUrl	string	false	URL da imagem principal do post
title	string	false	Título do post
slug	string	false	Slug único do post
body	string	false	Corpo do post
markdown	string	false	Código markdown do post
likes	number	false	Número de likes do post
author.id	string	false	ID único do autor
author.name	string	false	Nome completo do autor
author.username	string	false	Username do autor
author.avatar	string	false	URL do avatar do autor
comments	void[][]	false	Lista de comentários do post
createdAt	string	false	Data de criação do post
updatedAt	string	false	Data da última atualização do post
```

### 7. Curtir post (incrementar likes)
METHOD POST URL /blog-posts/{id}/like
OPERATION_ID PostsController_like
URL_PARAMS_TSV
```tsv
name	in	required	type	description
id	path	true	number	ID do post
```
RESPONSE_FIELDS_TSV
```tsv
path	type	nullable	description
id	number	false	ID único do post
cover	string	false	URL da imagem de capa do post
imageUrl	string	false	URL da imagem principal do post
title	string	false	Título do post
slug	string	false	Slug único do post
body	string	false	Corpo do post
markdown	string	false	Código markdown do post
likes	number	false	Número de likes do post
author.id	string	false	ID único do autor
author.name	string	false	Nome completo do autor
author.username	string	false	Username do autor
author.avatar	string	false	URL do avatar do autor
comments	void[][]	false	Lista de comentários do post
createdAt	string	false	Data de criação do post
updatedAt	string	false	Data da última atualização do post
```

