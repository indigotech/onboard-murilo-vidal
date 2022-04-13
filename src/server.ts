import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './data/resolver/user.resolver';
import { createConnection, useContainer } from 'typeorm';
import { UserEntity } from './data/entity/user.entity';
import * as dotenv from 'dotenv';
import Container from 'typedi';
import path from 'path';
import { HelloWorldResolver } from './data/resolver/hello-world.resolver';

if (process.env.TEST === 'OK') {
  dotenv.config({ path: path.join(__dirname, '..') + '/test.env' });
} else {
  dotenv.config();
}
export class GraphQLServer {
  public async startServer() {
    try {
      useContainer(Container);
      await createConnection({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: true,
        logging: false,
        entities: [UserEntity],
        migrations: [],
        subscribers: [],
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to initialize database connection');
    }

    const schema = await buildSchema({
      resolvers: [UserResolver, HelloWorldResolver],
      container: Container,
    });

    const app = express();

    const server = new ApolloServer({
      schema,
      validationRules: [depthLimit(7)],
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
