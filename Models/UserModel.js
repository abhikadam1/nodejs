const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

// name, email, password, confirmPassword, photo
const userSchecma = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please fill your name.']
    },

    email: {
        type: String,
        required: [true, 'Please fill your email'],
        unique: [true, 'This email already exits'],
        lowercase: true,
        validate: [validator.isEmail, 'Please fill a valid email'],
    },

    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 8,
    },

    confirmPassword: {
        type: String,
        required: [true, "Please confirm your a password"],
        validate: {
            // only work for save and create function not for update function 
            validator: function (val) {
                return val === this.password;
            },
            message : "Password & Confirm Password does not match"
        }
    },
    photo: String
});
userSchecma.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcryptjs.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
})
const user = mongoose.model('User', userSchecma);

module.exports = user;