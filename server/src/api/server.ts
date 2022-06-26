import cors from '@koa/cors'
import { ApolloServer } from 'apollo-server-koa'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import Koa from 'koa'
import http from 'http'
import schema from '../graphql'
import { createContext } from '../graphql/context'

const httpServer = http.createServer()

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
  formatError: (err) => ({
    message: err.message || 'Internal server error',
    code: 500,
  }),
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

const app = new Koa()

app.use(cors())

const PORT = 3000

export default async function startApolloServer() {
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })
  httpServer.on('request', app.callback())
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve))
  console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
  return { apolloServer, app }
}
