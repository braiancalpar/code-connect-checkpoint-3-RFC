# Autenticação

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
1	Registrar novo usuário	POST	/auth/register	AuthController_register
2	Fazer login	POST	/auth/login	AuthController_login
3	Obter dados do usuário logado	GET	/auth/me	AuthController_getProfile
4	Fazer logout	POST	/auth/logout	AuthController_logout
```

### 1. Registrar novo usuário
METHOD POST URL /auth/register
OPERATION_ID AuthController_register
BODY_FIELDS_TSV
```tsv
path	type	required	description
email	string	true	Email do usuário
password	string	true	Senha do usuário (mínimo 6 caracteres)
name	string	true	Nome completo do usuário
```
RESPONSE_FIELDS_TSV
```tsv
path	type	nullable	description
access_token	string	false	Token JWT para autenticação
user.id	string	false	ID único do usuário
user.email	string	false	Email do usuário
user.name	string	false	Nome completo do usuário
user.createdAt	string	false	Data de criação do usuário
user.updatedAt	string	false	Data da última atualização do usuário
```

### 2. Fazer login
METHOD POST URL /auth/login
OPERATION_ID AuthController_login
BODY_FIELDS_TSV
```tsv
path	type	required	description
email	string	true	Email do usuário
password	string	true	Senha do usuário
```
RESPONSE_FIELDS_TSV
```tsv
path	type	nullable	description
access_token	string	false	Token JWT para autenticação
user.id	string	false	ID único do usuário
user.email	string	false	Email do usuário
user.name	string	false	Nome completo do usuário
user.createdAt	string	false	Data de criação do usuário
user.updatedAt	string	false	Data da última atualização do usuário
```

### 3. Obter dados do usuário logado
METHOD GET URL /auth/me
OPERATION_ID AuthController_getProfile
RESPONSE_FIELDS_TSV
```tsv
path	type	nullable	description
id	string	false	ID único do usuário
email	string	false	Email do usuário
name	string	false	Nome completo do usuário
createdAt	string	false	Data de criação do usuário
updatedAt	string	false	Data da última atualização do usuário
```

### 4. Fazer logout
METHOD POST URL /auth/logout
OPERATION_ID AuthController_logout
RESPONSE_FIELDS_TSV
```tsv
path	type	nullable	description
message	string	false	Mensagem de confirmação do logout
```

