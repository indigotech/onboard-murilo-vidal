import { AppDataSource } from './data-source';
import { UserEntity } from './data/entity/user.entity';
import { GraphQLServer } from './server';

(async () => {
  const server = new GraphQLServer();
  await server.startServer();

  const appDataSource = new AppDataSource();
  let dataSource;

  try {
    dataSource = await appDataSource.getInitializedDatasource();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to initialize datasource');
  }

  // Just for demonstration purposes
  const user = new UserEntity();

  user.firstName = 'Zaphod';
  user.lastName = 'Beeblebrox';
  user.age = 42;

  dataSource.manager.save(user);
  console.log('Saved user:', user);
})();
