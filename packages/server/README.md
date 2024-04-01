# A Tmeplate Using Apollo Server v4 & Prisma & Pothos Schema Builder & Koa

This example shows how to implement a **GraphQL server & Restful API server with TypeScript** with the following stack:

- [**Apollo Server**](https://github.com/apollographql/apollo-server): HTTP server for GraphQL APIs
- [**Koa**](https://github.com/koajs/koa): Expressive HTTP middleware framework for node.js
- [**@as-integrations/koa**](https://github.com/apollo-server-integrations/apollo-server-integration-koa): A TypeScript/JavaScript GraphQL middleware for @apollo/server
- [**Koa Router**](https://github.com/koajs/router): Router middleware for Koa.
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)
- [**Pothos GraphQL**](https://github.com/hayes/pothos): Pothos is a plugin based GraphQL schema builder for typescript.

## 1. Download example and install dependencies

Clone this repository:

```
git clone https://github.com/Limoer96/apollo-server-v4-koa-prisma-bolierplate.git
```

Install npm dependencies:

```
cd apollo-server-v4-koa-prisma-bolierplate
pnpm install
```

## 2. Create and seed the database

> tips: you should run your own PostgreSQL server & modify `.env` file `DATABASE_URL` to your own connection string.

Run the following command to create your PostgreSQL database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.

## 3. Start the server

Launch your GraphQL server with this command:

```
pnpm run dev
```

Navigate to [http://localhost:4000/graphql](http://localhost:4000/graphql) in your browser to explore the API of your GraphQL server.
Navigate to [http://localhost:4000/user?id=xx](http://localhost:4000/user) to visit the `/user` restful api.

## Next

Then you can explore and modify it as you want, enjoy it!
