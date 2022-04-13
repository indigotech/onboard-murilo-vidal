import { expect } from 'chai';

const url = `http://localhost:3000/`;
const request = require('supertest')(url);

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
