# Comentários

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
1	Criar comentário em um post	POST	/comments/post/{postId}	CommentsController_create
2	Listar comentários de um post	GET	/comments/post/{postId}	CommentsController_findAllByPost
3	Buscar comentário por ID	GET	/comments/{id}	CommentsController_findOne
4	Atualizar comentário (apenas o autor)	PATCH	/comments/{id}	CommentsController_update
5	Deletar comentário (apenas o autor)	DELETE	/comments/{id}	CommentsController_remove
```

### 1. Criar comentário em um post
METHOD POST URL /comments/post/{postId}
OPERATION_ID CommentsController_create
URL_PARAMS_TSV
```tsv
name	in	required	type	description
postId	path	true	number	ID do post
```
BODY_FIELDS_TSV
```tsv
path	type	required	description
text	string	true	Texto do comentário
```
RESPONSE_FIELDS_TSV
```tsv
path	type	nullable	description
id	number	false	ID único do comentário
text	string	false	Texto do comentário
postId	number	false	ID do post comentado
author.id	string	false	ID único do autor
author.name	string	false	Nome completo do autor
author.username	string	false	Username do autor
author.avatar	string	false	URL do avatar do autor
createdAt	string	false	Data de criação do comentário
updatedAt	string	false	Data da última atualização do comentário
```

### 2. Listar comentários de um post
METHOD GET URL /comments/post/{postId}
OPERATION_ID CommentsController_findAllByPost
URL_PARAMS_TSV
```tsv
name	in	required	type	description
postId	path	true	number	ID do post
```
RESPONSE_FIELDS_TSV
```tsv
path	type	nullable	description
id	number	false	ID único do comentário
text	string	false	Texto do comentário
postId	number	false	ID do post comentado
author.id	string	false	ID único do autor
author.name	string	false	Nome completo do autor
author.username	string	false	Username do autor
author.avatar	string	false	URL do avatar do autor
createdAt	string	false	Data de criação do comentário
updatedAt	string	false	Data da última atualização do comentário
```

### 3. Buscar comentário por ID
METHOD GET URL /comments/{id}
OPERATION_ID CommentsController_findOne
URL_PARAMS_TSV
```tsv
name	in	required	type	description
id	path	true	number	ID do comentário
```
RESPONSE_FIELDS_TSV
```tsv
path	type	nullable	description
id	number	false	ID único do comentário
text	string	false	Texto do comentário
postId	number	false	ID do post comentado
author.id	string	false	ID único do autor
author.name	string	false	Nome completo do autor
author.username	string	false	Username do autor
author.avatar	string	false	URL do avatar do autor
createdAt	string	false	Data de criação do comentário
updatedAt	string	false	Data da última atualização do comentário
```

### 4. Atualizar comentário (apenas o autor)
METHOD PATCH URL /comments/{id}
OPERATION_ID CommentsController_update
URL_PARAMS_TSV
```tsv
name	in	required	type	description
id	path	true	number	ID do comentário
```
BODY_FIELDS_TSV
```tsv
path	type	required	description
text	string	false	Texto do comentário
```
RESPONSE_FIELDS_TSV
```tsv
path	type	nullable	description
id	number	false	ID único do comentário
text	string	false	Texto do comentário
postId	number	false	ID do post comentado
author.id	string	false	ID único do autor
author.name	string	false	Nome completo do autor
author.username	string	false	Username do autor
author.avatar	string	false	URL do avatar do autor
createdAt	string	false	Data de criação do comentário
updatedAt	string	false	Data da última atualização do comentário
```

### 5. Deletar comentário (apenas o autor)
METHOD DELETE URL /comments/{id}
OPERATION_ID CommentsController_remove
URL_PARAMS_TSV
```tsv
name	in	required	type	description
id	path	true	number	ID do comentário
```
RESPONSE_TYPE void

