const express = require("express");
const authRouter = express.Router();
const authController = require("./../Controller/AuthController")


authRouter.route('/signup').post(authController.signup);

module.exports = authRouter;