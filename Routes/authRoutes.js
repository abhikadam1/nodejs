const express = require("express");
const authRouter = express.Router();
const authController = require("./../Controller/AuthController")


authRouter.route('/signup').post(authController.signup);
authRouter.route('/login').post(authController.login);

module.exports = authRouter;