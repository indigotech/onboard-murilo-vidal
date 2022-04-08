import { AppDataSource } from './data-source';
import { User } from './entity/user.entity';
import { GraphQLServer } from './server';

(async () => {
  const server = new GraphQLServer();
  await server.startServer();

  const appDataSource = new AppDataSource();
  const dataSource = await appDataSource.getInitializedDatasource();

  // Just for demonstration purposes
  const user = new User();

  user.firstName = 'Zaphod';
  user.lastName = 'Beeblebrox';
  user.age = 42;

  dataSource.manager.save(user);
  console.log('Saved user:', user);
})();
