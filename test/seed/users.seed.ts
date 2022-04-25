import { getConnection } from 'typeorm';
import { UserEntity } from '../../src/data/entity/user.entity';
import { startDatabaseConnection } from '../../src/database.service';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export async function usersSeed() {
  console.log('seeding users');

  await startDatabaseConnection();
  const connection = getConnection();

  const users = [];
  for (let i = 0; i < 50; i++) {
    let user = new UserEntity();
    user.name = faker.name.findName();
    user.email = faker.internet.email();
    user.birthDate = faker.date.past();
    user.password = bcrypt.hashSync(faker.internet.password(), 10);
    users.push(user);
  }

  connection.createQueryBuilder().insert().into(UserEntity).values(users).execute();
}
