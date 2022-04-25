import Container from 'typedi';
import { createConnection, useContainer } from 'typeorm';
import { UserEntity } from './data/entity/user.entity';
import { loadEnv } from './function/load-env.function';

loadEnv();

export async function startDatabaseConnection() {
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
}
