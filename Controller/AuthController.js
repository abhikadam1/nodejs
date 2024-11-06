const { status } = require("express/lib/response");
const user = require("./../Models/UserModel");
const ApiFeatures = require("./../Utils/ApiFeatures");
const CustomError = require("./../Utils/CustomError");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");

exports.signup = asyncErrorHandler(async (req, res, next) => {
    const newUser = await user.create(req.body);
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXPIRES,
    });
    res.status(201).json({
        status: "User Created",
        token,
        data: {
            user: newUser,
        },
    });
});

// <<<<<<< HEAD
// });

// exports.login = asyncErrorHandler(async (req, res, next) => {
//     const newUser = await user.create(req.body);
//     const token = jwt.sign({id : newUser._id}, process.env.SECRET_STR, {
//         expiresIn : process.env.LOGIN_EXPIRES
//     })
//     res.status(201).json({
//         status: "User Created",
//         token,
//         data: {
//             user: newUser
//         }
//     });

// });
exports.login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    //   let email = req.body.email;
    //   let password = req.body.password;
    if (!email || !password) {
        const error = new CustomError("Invalid email or password", 401);
        return next(error);
    }
    const user1 = await user.findOne({ email }).select("+password");
    console.log(user1, " user1 ");


    res.status(200).json({
        status: "User logged in",
        data: {
            user: user1,
        },
    });
});
// >>>>>>> 51e1ecb243c5a842503cae207366565a07964ec9
