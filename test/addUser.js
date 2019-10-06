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
    it('Test if email is invalid', (done) => {
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
        .send({name: "NewUser", age:23, email:"", friends:["lrs", "ion", "ana"]})
        .then(()=>{
            //compare number of users before added with new number of users (which will be the same, because user will not added)
            User.countDocuments({}).exec((err, count) => {
                if (err) {
                    res.send(err);
                    return;
                }
                expect(numberOfUsersBeforeAdded).to.equal(count);
                done();
            });
        })
        .catch(err=>done(err))    
    });
    it('Test if name is invalid', (done) => {
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
        .send({name: "", age:23, email:"ion@ion.com", friends:["lrs", "ion", "ana"]})
        .then(()=>{
            //compare number of users before added with new number of users (which will be the same, because user will not added)
            User.countDocuments({}).exec((err, count) => {
                if (err) {
                    res.send(err);
                    return;
                }
                expect(numberOfUsersBeforeAdded).to.equal(count);
                done();
            });
        })
        .catch(err=>done(err))    
    });
    it('Test if age is not a number', (done) => {
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
        .send({name: "ion", age:"qwd", email:"ion@ion.com", friends:["lrs", "ion", "ana"]})
        .then(()=>{
            //compare number of users before added with new number of users (which will be the same, because user will not added)
            User.countDocuments({}).exec((err, count) => {
                if (err) {
                    res.send(err);
                    return;
                }
                expect(numberOfUsersBeforeAdded).to.equal(count);
                done();
            });
        })
        .catch(err=>done(err))    
    });
})