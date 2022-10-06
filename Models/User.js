const { model } = require("mongoose");

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/userloginsystem')

const db = mongoose.connection

//User Schema
const UserSchema = mongoose.Schema({
    username:{
        type:String,
        index:true
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    name:{
        type:String
    },
    profileImage:{
        type:String
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

const createUser = function( newUser,callback){
    newUser.save(callback)
}

module.exports = {
    createUser
}