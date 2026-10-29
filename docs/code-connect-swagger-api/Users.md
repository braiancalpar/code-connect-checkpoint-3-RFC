# Users

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
1	Atualizar avatar do usuário logado	PUT	/users/avatar	UsersController_updateAvatar
```

### 1. Atualizar avatar do usuário logado
METHOD PUT URL /users/avatar
OPERATION_ID UsersController_updateAvatar
BODY_FIELDS_TSV
```tsv
path	type	required	description
avatar	string	false	Arquivo de imagem para o avatar (obrigatório)
```
RESPONSE_FIELDS_TSV
```tsv
path	type	nullable	description
id	string	false	id
name	string	false	name
email	string	false	email
username	string	false	username
avatar	string	false	avatar
createdAt	string	false	createdAt
updatedAt	string	false	updatedAt
```

