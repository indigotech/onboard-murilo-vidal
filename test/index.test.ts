import { expect } from 'chai';
import { Connection, getConnection } from 'typeorm';
import { GraphQLServer } from '../src/server';

const url = `http://localhost:3000/`;
const request = require('supertest')(url);

describe('Graphql helloWorld', () => {
  let connection: Connection;

  before(async () => {
    try {
      const server = new GraphQLServer();
      await server.startServer();
    } finally {
      connection = getConnection();
      await connection.synchronize();
    }
  });

  after(async () => {
    await connection.dropDatabase();
  });

  it('Returns Hello, world!', async () => {
    const response = await request.post('graphql').send({
      query: '{ helloWorld }',
    });

    expect(response.body.data.helloWorld).to.be.equal('Hello, world!');
  });
});
