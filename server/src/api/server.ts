import cors from "@koa/cors";
import { ApolloServer } from "apollo-server-koa";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import Koa from "koa";
import serve from "koa-static";
import http from "http";
import path from "path";
import historyApiFallback from "koa2-connect-history-api-fallback";
import schema from "../graphql";
import { createContext } from "../graphql/context";
import { historyApiFallbackWhiteList, PORT, serverAddress } from "./constants";
import router from './restful/router'
import bodyParser from "koa-bodyparser";

const httpServer = http.createServer();

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
  formatError: (err) => {
    const messageCodeReg = /^\[(\w+)\]/;
    const codeStr = messageCodeReg.exec(err.message)?.[1];
    const code = codeStr ? Number(codeStr) : 500;
    return {
      message: err.message || "Internal server error",
      extensions: {
        code,
      },
    };
  },
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const app = new Koa();

app
  .use(bodyParser())
  .use(cors())
  .use(historyApiFallback({ whiteList: historyApiFallbackWhiteList }))
  .use(serve(path.resolve(__dirname, "../../static")))
  .use(router.routes())
  .use(router.allowedMethods())

export default async function startApolloServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  httpServer.on("request", app.callback());
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server ready at ${serverAddress}${apolloServer.graphqlPath}`);
  return { apolloServer, app };
}
