import { expect } from 'chai';
import { Connection, getConnection, Repository } from 'typeorm';
import { UserEntity } from '../src/data/entity/user.entity';
import bcrypt from 'bcrypt';
import { UserFixture } from './fixture/user.fixture';
import { authConfig } from '../src/auth/auth.config';
import { sign } from 'jsonwebtoken';

const url = `http://localhost:3000/`;
const request = require('supertest')(url);

describe('Query user', async function () {
  let connection: Connection;
  let userRepository: Repository<UserEntity>;

  before(async () => {
    connection = getConnection();
    userRepository = connection.getRepository(UserEntity);
    await connection.synchronize();
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it('returns error when there is no user with provided id', async () => {
    const token = sign(
      {
        id: 1,
        name: 'username',
      },
      authConfig.secret,
      {
        expiresIn: authConfig.expires,
      },
    );

    const response = await request.post('graphql').send({
      query: `mutation { createUser(userInput: { name: "Machado de Assis", email: "machado@assis.com", password: "machado45515" , birthDate: "10-10-1999", token: "" }){ id, name, email, birthDate} }`,
    });

    expect(response.body.errors[0].message).to.be.eq('Token missing.');
  });

  it('returns the proper user', async () => {
    const user = new UserFixture();
    const newUser = await createUser(user);

    const token = sign(
      {
        id: newUser.id,
        name: newUser.name,
      },
      authConfig.secret,
      {
        expiresIn: authConfig.expires,
      },
    );

    const response = await request.post('graphql').send({
      query: `query { user(queryUserInput: { id: ${newUser.id}, token: "${token}"}){ id, name, email, birthDate} }`,
    });

    expect(response.body.data).to.be.deep.eq({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        birthDate: new Date(newUser.birthDate).toISOString(),
      },
    });
  });
});

async function createUser(user: UserFixture): Promise<UserEntity> {
  const userRepository = getConnection().getRepository(UserEntity);
  const userEntity = new UserEntity();

  userEntity.name = user.name;
  userEntity.email = user.email;
  userEntity.birthDate = new Date(user.birthDate);
  userEntity.password = bcrypt.hashSync(user.password, 10);

  return userRepository.save(userEntity);
}
