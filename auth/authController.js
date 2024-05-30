const User = require('./../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = require('./../utils/jwtSecret');

const generate_jwt = (userId, res) => {
    const payload = {
        userId
    }

    const token = jwt.sign(payload, secret, { expiresIn: '14d'});

    return res.cookie('jwt', 
        token,
        {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                httpOnly:true,
                sameSite: 'strict',
                secure: false
        }
    )
}


class authController {
    async registartion(req, res) {
        try {
            const { email, password, username } = req.body;

            const candidate = await User.findOne({email});
    
            if (candidate) {
                return res.status(400).json({
                    message: `Пользователь с почтой ${email} уже существует`
                })
            }
    
            const hashPassword = bcrypt.hashSync(password, 7);
    
    
            const user = new User({
                username,
                email,
                password: hashPassword
            });
    
            await user.save();
    
            await generate_jwt(user._id, res)
    
            return res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            });
        } catch (error) {   
            console.log(error);
            return res.status(400).json({
                message: 'Ошибка на сервере'
            })
        }
       
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({
                    message: `Пользователя с почтой ${email} не существует`
                })
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({
                    message: `Пароль ${password} неверный`
                })
            }

            await generate_jwt(user._id, res);

            return res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: 'Ошибка на сервере'
            })
        }
    }
    async logout(req, res) {
        res.cookie('jwt', '', {
            maxAge: 0
        });
        return res.status(200).json({
            message: 'Вы вышли с аккаунта'
        })
    }
    async delete(req, res) {
        try {
            const { userId } = req.params;

            await User.findByIdAndDelete(userId);

            return res.status(200).json({
                message: 'Аккаунт успешно удален'
            });
        } catch (e) {
            console.log(e);
            return res.status(400).json({
                message: 'Ошибка на сервере'
            })
        }
    }
}

module.exports = new authController();