# Trabalho III - Backend Base
# Documentação da API
## Endpoints

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| GET | `/health` | — | Status da API |
| POST | `/auth/register` | — | Cadastrar usuário |
| POST | `/auth/login` | — | Login |
| POST | `/categories` | Bearer | Criar categoria |
| GET | `/categories` | Bearer | Listar categorias |
| POST | `/transactions` | Bearer | Criar lançamento |
| GET | `/transactions?month=6&year=2026&categoryId=...` | Bearer | Listar lançamentos com filtros |
| PATCH | `/transactions/:id/pay` | Bearer | Marcar despesa como paga |
| GET | `/reports/monthly-balance?month=6&year=2026` | Bearer | Consultar saldo mensal |
| GET | `/reports/category-summary?month=6&year=2026` | Bearer | Relatório de gastos por categoria |

## Autenticação

As rotas protegidas utilizam autenticação via **Bearer Token**.

Exemplo de cabeçalho HTTP:

```http
Authorization: Bearer <seu_token_jwt>
```

## Filtros disponíveis

### Listar lançamentos

```http
GET /transactions?month=6&year=2026&categoryId=<id_categoria>
```

Parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `month` | Number | Não | Mês da consulta |
| `year` | Number | Não | Ano da consulta |
| `categoryId` | String | Não | Filtra por categoria |

### Saldo mensal

```http
GET /reports/monthly-balance?month=6&year=2026
```

Parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `month` | Number | Sim | Mês da consulta |
| `year` | Number | Sim | Ano da consulta |

### Resumo por categoria

```http
GET /reports/category-summary?month=6&year=2026
```

Parâmetros:

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `month` | Number | Sim | Mês da consulta |
| `year` | Number | Sim | Ano da consulta |
