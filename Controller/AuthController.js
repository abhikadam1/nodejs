const { status } = require('express/lib/response');
const user = require('./../Models/UserModel');
const ApiFeatures = require('./../Utils/ApiFeatures');
const CustomError = require('./../Utils/CustomError');
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');

exports.signup = asyncErrorHandler(async (req, res, next) => {
    const newUser = await user.create(req.body);
    const token = jwt.sign({id : newUser._id}, process.env.SECRET_STR, {
        expiresIn : process.env.LOGIN_EXPIRES
    })
    res.status(201).json({
        status: "User Created",
        token,
        data: {
            user: newUser
        }
    });

})