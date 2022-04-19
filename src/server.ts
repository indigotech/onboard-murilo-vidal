import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './data/resolver/user.resolver';
import Container from 'typedi';
import { HelloWorldResolver } from './data/resolver/hello-world.resolver';
import { DatabaseService } from './database.service';
import { ErrorHandler } from './error/error.handler';

export class GraphQLServer {
  public async startServer() {
    try {
      const databaseService = new DatabaseService();
      await databaseService.startConnection();
    } catch (error) {
      console.error('Failed to initialize database');
    }

    const schema = await buildSchema({
      resolvers: [UserResolver, HelloWorldResolver],
      container: Container,
    });

    const app = express();

    const server = new ApolloServer({
      schema,
      validationRules: [depthLimit(7)],
      formatError: ErrorHandler,
    });
    const corsOptions = cors({ origin: true });

    app.use('*', corsOptions);
    app.use(compression());

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    const httpServer = createServer(app);

    httpServer.listen({ port: 3000 }, (): void =>
      console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`),
    );
  }
}
