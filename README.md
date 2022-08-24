# learning-graphql

## Backend
- Apollo Server: is a GraphQL web server. It is based on Express.
- Nexus: library to create type-safe GraphQL schemas using the code-first approach.
```bash
npx ts-node --transpile-only src/schema
```

### Prisma
```bash
yarn add -D prisma
yarn add @prisma/client
```
```bash
npx prisma init
```

## Some tips
Take a look at [DataLoader](https://github.com/graphql/dataloader) for batching and catching requests.