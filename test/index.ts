import { GraphQLServer } from '../src/server';

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
        console.log('Printing response:');
        console.log(res.body.data.helloWorld);
        done();
      });
  });
});
