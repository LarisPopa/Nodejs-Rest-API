const express = require('express');
const mongoose = require('mongoose')
const User = require ('./models/User')
const users = require ('./routes/users')
const app = express();

//BodyParser Middleware
app.use(express.json());

//Database connection
mongoose.connect('mongodb://laris:laris23@ds121295.mlab.com:21295/lrs', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected!")
    })
    .catch(err => console.log(err))


app.use('/api/users', users);


app.listen(4000, ()=>{
    console.log("Server run on port 4000")
})

module.exports = app



