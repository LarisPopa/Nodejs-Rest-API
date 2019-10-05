const express = require('express');
const mongoose = require('mongoose')
const User = require ('./models/User')
const app = express();

//BodyParser Middleware
app.use(express.json());

//Database connection
mongoose.connect('mongodb://laris:laris23@ds121295.mlab.com:21295/lrs', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected!")
    })
    .catch(err => console.log(err))

//Get user info by id
app.get('/getUser/:id',(req, res)=>{
    User.findById({_id: req.params.id})
        .then(user => res.json(user))
        .catch(err=>console.log(err))
})

//add new user
app.post('/addUser',(req, res)=>{
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
app.delete('/deleteUser/:id', (req, res)=>{
    User.findById(req.params.id)
        .then(user=> user.remove().then(()=>res.json({succes: true})))
        .catch(()=>res.json({succes: false}))
    
})
//update user details by id
app.put('/updateUser/:id',(req, res)=>{
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

app.listen(4000, ()=>{
    console.log("Server run on port 4000")
})

module.exports = app



