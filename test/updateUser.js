const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server.js')

describe('PUT /updateUser/id', () => {
    it('Test if user name is updated', (done) => {
        request(app).put('/updateUser/5d98a93713e004307d1a9110')
        .send({name: "Maria", age:23, email:"maria@maria.com", friends:["lrs", "ion"]})
        .then(()=>{
            request(app).get('/getUser/5d98a93713e004307d1a9110')
            .then((res) => {
              const body = res.body;
              expect(body.name).to.equal('Maria');
              done();
            })
        })
        .catch(err=>done(err))    
    });
})