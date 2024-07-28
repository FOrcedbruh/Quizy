const express = require('express');
const authRouter = express.Router();
const authController = require('./authController');
const protectedRoute = require('./../middleware/protectedRoute');
const upload = require('./../middleware/upload');

authRouter.post('/registration', authController.registartion);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post('/delete/:userId', protectedRoute, authController.delete);
authRouter.post('/setAvatar', upload.single('file'), authController.updateAvatar);
authRouter.get('/getAvatar/:avatarName', authController.getAvatar);

module.exports = authRouter;