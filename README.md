# 🍳 Recipe Catalog API

Uma API REST moderna para gerenciamento de receitas culinárias, desenvolvida com **NestJS** seguindo os princípios da **Clean Architecture**.

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://recipe-catalog-iwi99mcuu-gabriels-projects-c73e3950.vercel.app)
[![API Docs](https://img.shields.io/badge/API-Swagger-85EA2D?logo=swagger)](https://recipe-catalog-qta4atetz-gabriels-projects-c73e3950.vercel.app/api/docs)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

## 🌟 Funcionalidades

- ✅ **Validação robusta** com class-validator
- ✅ **Documentação automática** com Swagger/OpenAPI
- ✅ **Clean Architecture** com separação de responsabilidades
- ✅ **Tratamento de erros** padronizado
- ✅ **Deploy automático** no Vercel
- ✅ **Banco de dados** PostgreSQL gerenciado pelo Supabase
- ✅ **ORM moderno** com Prisma para type-safety

## 🚀 Links Importantes

| Recurso | URL |
|---------|-----|
| **🌐 API Base** | https://recipe-catalog-iwi99mcuu-gabriels-projects-c73e3950.vercel.app |
| **📚 Documentação** | https://recipe-catalog-qta4atetz-gabriels-projects-c73e3950.vercel.app/api/docs |
| **📋 Receitas** | https://recipe-catalog-iwi99mcuu-gabriels-projects-c73e3950.vercel.app/recipes |

## 🛠️ Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js para aplicações escaláveis
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Prisma](https://www.prisma.io/)** - ORM moderno com type-safety completo
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service com PostgreSQL
- **[Swagger/OpenAPI](https://swagger.io/)** - Documentação automática da API
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação baseada em decorators
- **[Class Transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos
- **[Vercel](https://vercel.com/)** - Plataforma de deploy

## 🗄️ Banco de Dados

### PostgreSQL + Supabase
A aplicação utiliza **PostgreSQL** como banco de dados, hospedado no **Supabase**, que oferece:

- 🔒 **Autenticação** integrada
- 📊 **Dashboard** para gerenciamento
- 🚀 **Performance** otimizada
- 🔄 **Backup** automático
- 🌐 **Edge Functions** disponíveis

### Prisma ORM
O **Prisma** é utilizado como ORM, proporcionando:

- 🎯 **Type Safety** completo
- 📝 **Schema declarativo**
- 🔄 **Migrations** automáticas
- 🔍 **Query Builder** intuitivo
- 📊 **Prisma Studio** para visualização

## 📋 Endpoints da API

### 🍽️ Receitas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/recipes` | Lista todas as receitas |
| `POST` | `/recipes` | Cria uma nova receita |
| `GET` | `/recipes/:id` | Busca receita por ID |

## 🧪 Exemplos de Uso

### Listar receitas
```bash
curl -X GET https://recipe-catalog-iwi99mcuu-gabriels-projects-c73e3950.vercel.app/recipes
```

### Criar receita
```bash
curl -X POST https://recipe-catalog-iwi99mcuu-gabriels-projects-c73e3950.vercel.app/recipes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Bolo de Chocolate",
    "description": "Um delicioso bolo de chocolate para sobremesa",
    "ingredients": [
      "2 xícaras de farinha de trigo",
      "1 xícara de açúcar",
      "1/2 xícara de chocolate em pó",
      "3 ovos",
      "1 xícara de leite"
    ]
  }'
```

### Buscar receita por ID
```bash
curl -X GET https://recipe-catalog-iwi99mcuu-gabriels-projects-c73e3950.vercel.app/recipes/{id}
```

## 🔒 Tratamento de Erros

A API retorna erros padronizados:

```json
{
  "statusCode": 404,
  "message": "Recipe not found",
  "error": "Not Found",
  "timestamp": "2025-06-02T10:30:00.000Z",
  "path": "/recipes/invalid-id"
}
```

### Códigos de Status
- **200** - Sucesso
- **201** - Criado com sucesso
- **400** - Dados inválidos
- **404** - Recurso não encontrado
- **500** - Erro interno do servidor

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ por **Gabriel**

---

### 🔗 Links Úteis

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Swagger/OpenAPI](https://swagger.io/specification/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
