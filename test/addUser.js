const expect = require('chai').expect;
const request = require('supertest');
const User = require ('../models/User')

const app = require('../server.js')

describe('POST /addUser/id', () => {
    it('Test if user new user is added', (done) => {
        //count users before added new user
        let numberOfUsersBeforeAdded=0
        User.countDocuments({}).exec((err, count) => {
            if (err) {
                res.send(err);
                return;
            }
           numberOfUsersBeforeAdded=count
        });
        
        request(app).post('/addUser')
        .send({name: "NewUser", age:23, email:"newuser@newuser.com", friends:["lrs", "ion", "ana"]})
        .then(()=>{
            //compare number of users before added + 1 with new number of users
            User.countDocuments({}).exec((err, count) => {
                if (err) {
                    res.send(err);
                    return;
                }
                expect(numberOfUsersBeforeAdded+1).to.equal(count);
                done();
            });
        })
        .catch(err=>done(err))    
    });
})