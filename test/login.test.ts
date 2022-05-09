import { expect } from 'chai';
import { Connection, getConnection, Repository } from 'typeorm';
import { UserEntity } from '../src/data/entity/user.entity';
import { UserFixture } from './fixture/user.fixture';
import bcrypt from 'bcrypt';
import { LoginInput } from '../src/data/type/login-input.type';

const url = `http://localhost:3000/`;
const request = require('supertest')(url);

describe('User login endpoint', async function () {
  let connection: Connection;
  let userRepository: Repository<UserEntity>;

  before(async () => {
    connection = getConnection();
    await connection.synchronize();
    userRepository = connection.getRepository(UserEntity);
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it('succesfully logs in', async () => {
    const user = userRepository.create(new UserFixture());
    const loginInput = new LoginInput();
    loginInput.email = user.email;
    loginInput.password = user.password;
    const variables = { loginInput: loginInput };
    user.password = bcrypt.hashSync(user.password, 10);
    await userRepository.save(user);
    const birthDate = new Date(user.birthDate);
    const query = `mutation Mutation($loginInput: LoginInput!) {
                          login( loginInput: $loginInput )
                    {
                      user { id name email } 
                      token 
                    }
                  }`;

    const response = await request.post('graphql').send({ query, variables });

    expect(response.body.data.login).to.be.deep.eq({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: 'the_token',
    });
  });
});
