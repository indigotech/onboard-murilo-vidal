import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';

const dotenv = require('dotenv');
dotenv.config();

export class AppDataSource {
  public async getInitializedDatasource(): Promise<DataSource> {
    const appDataSource = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      logging: false,
      entities: [User],
      migrations: [],
      subscribers: [],
    });
    try {
      await appDataSource.initialize();
    } catch (error) {
      console.error('Failed to initialize datasource.');
    }
    return appDataSource;
  }
}
