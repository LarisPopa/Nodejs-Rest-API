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
    it('Test update when email is not valid', (done) => {
        request(app).put('/updateUser/5d98a93713e004307d1a9110')
        .send({name: "Maria", age:23, email:"", friends:["lrs", "ion"]})
        .then(()=>{
            request(app).get('/getUser/5d98a93713e004307d1a9110')
            .then((res) => {
              const body = res.body;
              expect(body.email).to.equal('maria@maria.com');
              done();
            })
        })
        .catch(err=>done(err))    
    });
    it('Test update when name is not valid', (done) => {
        request(app).put('/updateUser/5d98a93713e004307d1a9110')
        .send({name: "", age:23, email:"maria@maria.com", friends:["lrs", "ion"]})
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
    it('Test update when age is not a number', (done) => {
        request(app).put('/updateUser/5d98a93713e004307d1a9110')
        .send({name: "Maria", age:"asd", email:"maria@maria.com", friends:["lrs", "ion"]})
        .then(()=>{
            request(app).get('/getUser/5d98a93713e004307d1a9110')
            .then((res) => {
              const body = res.body;
              expect(body.age).to.equal(23);
              done();
            })
        })
        .catch(err=>done(err))    
    });
})