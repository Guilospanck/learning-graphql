import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'

import { schema } from './schema'
import { context } from './context'

export const server = new ApolloServer({
  schema,
  plugins: [
    // ApolloServerPluginLandingPageGraphQLPlayground(),
    ApolloServerPluginLandingPageLocalDefault(), // usually not used in production
  ],
  context,
  introspection: true // usually not used in production
})

const PORT = process.env.PORT || 3000

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})