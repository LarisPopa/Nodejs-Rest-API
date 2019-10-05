const expect = require('chai').expect;
const request = require('supertest');
const User = require ('../models/User')

const app = require('../server.js')

describe('DELETE /deleteUser/id', () => {
    it('Test if user is deleted', (done) => {
        request(app).delete('/deleteUser/5d9887be8dae5e2c0db35c94')
        .then(()=>{          
            User.findById({_id: '5d9887be8dae5e2c0db35c94'})
            .then(user=>{
                expect(user).to.equal(null);
                done();
            })
        })
        .catch(err=>done(err))    
    });
})