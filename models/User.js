const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{type: String},
    age:{type: Number},
    email:{type: String},
    friends:[]
})

module.exports = User = mongoose.model('user', UserSchema)