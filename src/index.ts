import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

import { schema } from './schema'
import { context } from './context'

export const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context
})

const PORT = 3000

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})