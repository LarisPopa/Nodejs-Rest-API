const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server.js')

describe('GET /user', () => {
    it('Test if user name is ok', (done) => {
        request(app).get('/getUser/5d960f66d9c0722940d37eef')
          .then((res) => {
            const body = res.body;
            expect(body.name).to.equal("Laris");
            done();
          })
          .catch((err) => done(err));
      });
})

