import { expect } from 'chai';
import { Connection, getConnection, Repository } from 'typeorm';
import { UserEntity } from '../src/data/entity/user.entity';
import bcrypt from 'bcrypt';
import exp from 'constants';
import { UserFixture } from './fixture/user.fixture';
import { GraphQLError } from 'graphql';

const url = `http://localhost:3000/`;
const request = require('supertest')(url);

describe('User endpoint', async function () {
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

  it('returns error when there is no token', async () => {
    const response = await request.post('graphql').send({
      query: `mutation { createUser(userInput: { name: "Machado de Assis", email: "machado@assis.com", password: "machado45515" , birthDate: "10-10-1999", token: "" }){ id, name, email, birthDate} }`,
    });

    expect(response.body.errors[0].message).to.be.eq('Token missing.');
  });

  it('returns error when the token is invalid', async () => {
    const response = await request.post('graphql').send({
      query: `mutation { createUser(userInput: { name: "Machado de Assis", email: "machado@assis.com", password: "machado45515" , birthDate: "10-10-1999", token: "invalid_token" }){ id, name, email, birthDate} }`,
    });

    expect(response.body.errors[0].message).to.be.eq('Invalid token.');
  });

  it('saves and returns the data from the created a user', async () => {
    const response = await createUser();
    const userRepository = connection.getRepository(UserEntity);

    const user = await userRepository.findOneOrFail();

    expect(response.body.data.createUser).to.be.deep.eq({
      id: user.id,
      name: user.name,
      email: user.email,
      birthDate: new Date('10-10-1999').toISOString(),
    });
  });

  it('saves a hashed password', async () => {
    await createUser();
    const userRepository = connection.getRepository(UserEntity);
    const user = await userRepository.findOneOrFail();

    expect(bcrypt.compare('machado45515', user.password));
  });
});

async function createUser(): Promise<any> {
  return request.post('graphql').send({
    query:
      'mutation { createUser(userInput: { name: "Machado de Assis", email: "machado@assis.com", password: "machado45515" , birthDate: "10-10-1999" }){ id, name, email, birthDate} }',
  });
}
