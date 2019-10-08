const express = require("express");
const router = express.Router();
const User = require ('../models/User')

//Get user info by id
router.get('/:id',(req, res)=>{
    User.findById({_id: req.params.id})
        .then(user => res.json(user))
        .catch(err=>console.log(err))
})

//add new user
router.post('/',(req, res)=>{
    const newUser = User({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        friends: req.body.friends
    })
    if(newUser.name !== undefined && newUser.name !== null && newUser.name !== ''){
        if(newUser.age !== undefined && newUser.age !== null && newUser.age !== '' && !isNaN(newUser.age)){
            if(newUser.email !== undefined && newUser.email !== null && newUser.email !== ''){
                newUser.save()
                    .then(user=>res.json(user))
                    .catch(err=>console.log(err))
            }
            else{
                res.json({succes: false})
            }    
        }
        else{
            res.json({succes: false})
        }
    }
    else{
        res.json({succes: false})
    }
})

//delete user by id
router.delete('/:id', (req, res)=>{
    User.findById(req.params.id)
        .then(user=> user.remove().then(()=>res.json({succes: true})))
        .catch(()=>res.json({succes: false}))
    
})

//update user details by id
router.put('/:id',(req, res)=>{
    const newUser = User({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        friends: req.body.friends
    })
    
    if(newUser.name !== undefined && newUser.name !== null && newUser.name !== ''){
        if(newUser.age !== undefined && newUser.age !== null && newUser.age !== '' && !isNaN(newUser.age)){
            if(newUser.email !== undefined && newUser.email !== null && newUser.email !== ''){
                User.updateOne({_id: req.params.id}, {$set: {name: newUser.name, age: newUser.age, email: newUser.email, friends: newUser.friends}})
                    .then(()=>res.json({succes: true}))
                    .catch(err=>console.log(err))
            }
            else{
                res.json({succes: false})
            }    
        }
        else{
            res.json({succes: false})
        }
    }
    else{
        res.json({succes: false})
    }
})

module.exports = router











