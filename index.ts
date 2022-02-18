import "dotenv/config";

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import fs from "fs";
import http from "http";
import https from "https";

import schema from "./schema";
import type { ContextType } from "./schema/context";
import db from "./db";
import { confirm } from "./security";

import { startSocketServer } from "./socket";

const port = 4000;
const httpsPort = 4333;

function getHttpsServer(app: express.Application): http.Server {
  try {
    const privateKey = fs.readFileSync("privatekey.pem");
    const certificate = fs.readFileSync("certificate.pem");

    return https.createServer(
      {
        key: privateKey,
        cert: certificate,
      },
      app
    );
  } catch (e) {
    return http.createServer(app);
  }
}

const app = express();
const httpServer = http.createServer(app);
const httpsServer = getHttpsServer(app);

async function startApolloServer() {
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginDrainHttpServer({ httpServer: httpsServer }),
    ],

    context: async ({ res, req }): Promise<ContextType> => {
      let token = req.headers.authorization;
      const context: ContextType = { db };

      if (token) {
        if (token.toLowerCase().startsWith("bearer ")) {
          token = token.substr(7);
        }

        const data = confirm(token);
        if (data) {
          context.auth = data;
        }
      }

      return context;
    },
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      origin: true,
      credentials: true,
    },
  });

  httpServer.listen(port, () => {
    console.log(`🚀  Apollo Server ready on ${port}`);
  });

  httpsServer.listen(httpsPort, () => {
    console.log(`🚀  Apollo Server SSL ready on ${httpsPort}`);
  });
}

startApolloServer();
startSocketServer();
