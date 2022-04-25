import { expect } from 'chai';
import { Connection, getConnection, Repository } from 'typeorm';
import { UserEntity } from '../src/data/entity/user.entity';

const url = `http://localhost:3000/`;
const request = require('supertest')(url);

describe('User login endpoint', async function () {
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

  it('succesfully logs in', async () => {
    const response = await request.post('graphql').send({
      query: `mutation { login(loginInput: { email: "email" password: "password" }){
      user { id, name, email, birthDate } token }}`,
    });

    expect(response.body.data.login).to.be.deep.eq({
      user: {
        id: 1,
        name: 'User Name',
        email: 'User e-mail',
        birthDate: new Date('04-25-1990').toISOString(),
      },
      token: 'the_token',
    });
  });
});
