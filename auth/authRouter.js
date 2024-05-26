const express = require('express');
const authRouter = express.Router();
const authController = require('./authController');
const protectedRoute = require('./../middleware/protectedRoute');

authRouter.post('/registration', authController.registartion);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post('/delete/:userId', protectedRoute, authController.delete);


module.exports = authRouter;