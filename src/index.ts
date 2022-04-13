import { GraphQLServer } from './server';

(async () => {
  const server = new GraphQLServer();

  await server.startServer();
})();
