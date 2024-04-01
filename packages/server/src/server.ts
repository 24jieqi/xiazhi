import http from 'http'
import path from 'path'

import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { koaMiddleware } from '@as-integrations/koa'
import cors from '@koa/cors'
import * as dotenv from 'dotenv'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'

import router from '@/api/router'

dotenv.config()

import { PORT, serverAddress } from './constants'
import type { Context } from './context'
import { createContext } from './context'
import { schema } from './schema'
import { errorHandler } from './utils/errorHandler'

const app = new Koa()

const httpServer = http.createServer(app.callback())

const start = async () => {
  const server = new ApolloServer<Context>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    csrfPrevention: true,
    cache: 'bounded',
    formatError: errorHandler,
  })

  await server.start()
  const graphqlMiddleware = koaMiddleware(server, { context: createContext })
  router.all('/graphql', graphqlMiddleware)
  const env = process.env.NODE_ENV
  app
    .use(cors())
    .use(bodyParser())
    .use(
      serve(
        path.resolve(
          __dirname,
          env === 'development' ? './static' : '../../src/static',
        ),
      ),
    )
    .use(router.routes())
    .use(router.allowedMethods())
  await new Promise(resolve => {
    httpServer.listen({ port: PORT }, resolve as () => void)
  })
  console.log(`\
  🚀 Server ready at: ${serverAddress}/graphql
  ⭐️ See sample queries: https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql
  `)
}

start()
