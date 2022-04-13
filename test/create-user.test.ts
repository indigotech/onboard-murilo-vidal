import { expect } from 'chai';
import { getConnection } from 'typeorm';
import { UserEntity } from '../src/data/entity/user.entity';
import { GraphQLServer } from '../src/server';
import bcrypt from 'bcrypt';

const url = `http://localhost:3000/`;
const request = require('supertest')(url);

before(async () => {
  try {
    const server = new GraphQLServer();
    await server.startServer();
  } finally {
    const connection = getConnection();
    await connection.synchronize();
  }
});
after(async () => {
  const connection = getConnection();
  await connection.dropDatabase();
  await connection.close();
});

describe('User endpoint', function () {
  it('returns the data from the created a user', (done) => {
    request
      .post('graphql')
      .send({
        query:
          'mutation { createUser(userInput: { name: "Machado de Assis", email: "machado@assis.com", password: "machado45515" , dateOfBirth: "06-21-1839" }){ id, name, email, dateOfBirth} }',
      })
      .end((_err: any, res: { body: { data: any } }) => {
        expect(res.body.data.createUser).to.include({
          name: 'Machado de Assis',
          email: 'machado@assis.com',
        });
        expect(res.body.data.createUser.id).to.exist;
        expect(res.body.data.createUser.dateOfBirth).to.exist;

        done();
      });
  }),
    it('saves the user in the database', async () => {
      await createUser();
      const connection = getConnection();
      const userRepository = connection.getRepository(UserEntity);
      const user = await userRepository.findOne();

      expect(user?.name).to.be.equal('Machado de Assis');
    }),
    it('saves a hashed password', async () => {
      await createUser();
      const connection = getConnection();
      const userRepository = connection.getRepository(UserEntity);
      const user = await userRepository.findOne();

      expect(bcrypt.compare('machado45515', user?.password));
    });
});

// To become a fixture later
async function createUser(): Promise<any> {
  return request.post('graphql').send({
    query:
      'mutation { createUser(userInput: { name: "Machado de Assis", email: "machado@assis.com", password: "machado45515" , dateOfBirth: "10-10-1999" }){ id, name, email, dateOfBirth} }',
  });
}
