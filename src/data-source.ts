import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserEntity } from './data/entity/user.entity';

const dotenv = require('dotenv');
dotenv.config();

export class AppDataSource {
  public async getInitializedDatasource(): Promise<DataSource> {
    const appDataSource = new DataSource({
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

    return await appDataSource.initialize();
  }
}
