import { GraphQLServer } from '../src/server';
import { expect } from 'chai';

const url = `http://localhost:3000/`;
const request = require('supertest')(url);

before(async () => {
  const server = new GraphQLServer();
  await server.startServer();
});

describe('Graphql helloWorld', function () {
  it('Returns Hello, world!', (done) => {
    request
      .post('graphql')
      .send({
        query: '{ helloWorld }',
      })
      .end((err: any, res: { body: { data: { helloWorld: string } } }) => {
        expect(res.body.data.helloWorld).to.be.equal('Hello, world!');

        done();
      });
  });
});
