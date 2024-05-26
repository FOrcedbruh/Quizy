const jwt  = require('jsonwebtoken');
const secret = require('./../utils/jwtSecret');
const User = require('../models/User');
const { model } = require('mongoose');


const protectedRoute = async ( req, res, next)  => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(400).json({message: 'Вы не авторизованы'});
        }

        const decoded = jwt.verify(token, secret);

        if (!decoded) {
            return res.status(400).json({message: 'Некорректный токен'});
        }

        const user = await User.findById(decoded.userId).select('-password');

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = protectedRoute;