# learning-graphql
Studies following [HowToGraphQL](https://www.howtographql.com/basics/0-introduction/)

- GraphQL Scalars
The benefit of them is that they simultaneously add representation and validation for the primitive types of the API.

## Backend
- Apollo Server: is a GraphQL web server. It is based on Express.
- Nexus: library to create type-safe GraphQL schemas using the code-first approach.
```bash
npx ts-node --transpile-only src/schema
```

- If you want to write a SDL beforehand and then convert to TS, you can use `https://nexusjs.org/converter`.

### Prisma
- Add Prisma dependencies
```bash
yarn add -D prisma
yarn add @prisma/client
```
- Initiate new Prisma files
```bash
npx prisma init
```
- Migrate a new database after some schemas have been created:
```bash
npx prisma migrate dev --name "init"
```
- If you need to regenerate Prisma Client:
```bash
npx prisma generate
```

## Some tips
Take a look at [DataLoader](https://github.com/graphql/dataloader) for batching and catching requests.