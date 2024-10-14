const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const validator = require('validator')

// name, email, password, confirmPassword, photo
const userSchecma = new mongoose.Schema({
    name: {
        type: String,
        required : [true, 'Please fill your name.']
        
    },

    email: {
        type: String,
        required: [true, 'Please fill your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please fill a valid email'],
    },

    password :{
        type : String,
        required : [true, "Please enter a password"],
        minlength : 8,
    },

    confirmPassword :{
        type : String,
        required : [true, "Please confirm your a password"],
    },
    photo : String
});

const user = mongoose.model('User', userSchecma);

module.exports = user;