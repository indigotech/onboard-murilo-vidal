import { expect } from 'chai';
import { Connection, getConnection, Repository } from 'typeorm';
import { UserEntity } from '../src/data/entity/user.entity';
import { UserFixture } from './fixture/user.fixture';
import bcrypt from 'bcrypt';

const url = `http://localhost:3000/`;
const request = require('supertest')(url);

describe('User login endpoint', async function () {
  let connection: Connection;
  let userRepository: Repository<UserEntity>;

  before(async () => {
    connection = getConnection();
    userRepository = connection.getRepository(UserEntity);
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it('succesfully logs in', async () => {
    const user = userRepository.create(new UserFixture());
    user.password = bcrypt.hashSync(user.password, 10);

    await userRepository.save(user);
    const response = await request.post('graphql').send({
      query: `mutation { login(loginInput: { email: "${user.email}", password: "${new UserFixture().password}" }){
      user { id, name email birthDate } token }}`,
    });
    const birthDate = new Date(user.birthDate);

    expect(response.body.data.login).to.be.deep.eq({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        birthDate: `${birthDate.getFullYear()}-0${birthDate.getMonth() + 1}-${birthDate.getDate()}T00:00:00.000Z`,
      },
      token: 'the_token',
    });
  });
});
