const express = require('express');
const mongoose = require('mongoose')
const User = require ('./models/User')
const app = express();

app.use(express.json());

mongoose.connect('mongodb://laris:laris23@ds121295.mlab.com:21295/lrs', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected!")
    })
    .catch(err => console.log(err))

app.get('/getUser/:id',(req, res)=>{
    User.findById({_id: req.params.id})
        .then(user => res.json(user))
        .catch(err=>console.log(err))
})

app.post('/addUser',(req, res)=>{
    const newUser = User({
        name: req.body.name,
        age: req.body.age,
        email: req.body.age,
        friends: req.body.friends
    })
    newUser.save()
        .then(user=>res.json(user))
        .catch(err=>console.log(err))    
})

app.delete('/deleteUser/:id', (req, res)=>{
    User.findById(req.params.id)
        .then(user=> user.remove().then(()=>res.json({succes: true})))
        .catch(()=>res.json({succes: false}))
    
})
app.put('/updateUser/:id',(req, res)=>{
    User.updateOne({_id: req.params.id}, {$set: {name: req.body.name, age: req.body.age, email: req.body.email}})
        .then(user => res.json(user))
        .catch(err=>console.log(err))
    }
)

app.listen(4000, ()=>{
    console.log("Server run on port 4000")
})

module.exports = app



