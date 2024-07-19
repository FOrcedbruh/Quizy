const Quiz = require("../models/Quiz");
const User = require("../models/User");


class quizController {


    async createQuiz(req, res) {
        try {
            const { mainColor, listColor, textColor, categoryName, title, body } = req.body;
            const  userId  = req.user._id;

            const user = await User.findById(userId);

            if (!user) {
                return res.json({
                    message: 'Пользователь не найден'
                })
            }

            const quiz =  new Quiz({
                mainColor,
                listColor,
                textColor,
                categoryName,
                title,
                body
            });

            user.tests.push(quiz._id);

            await Promise.all([user.save(), quiz.save()]);


            return res.status(200).json(quiz);
        } catch (e) {
            console.log(e);
            return res.json({
                message: 'Ошибка на сервере'
            })
        }
    }
    async getQuiz(req, res) {
        try {
            const { quizId } = req.params;

            const quiz = await Quiz.findById(quizId);

            if (!quiz) {
                return res.json({
                    message: 'Quiz не найден'
                })
            }

            return res.status(200).json(quiz);
        } catch (error) {
            console.log(error);
            return res.json({
                message: 'Ошибка на сервере'
            })
        }
    }
    async getQuizzes(req, res) {
        try {
            const userId = req.user._id;

            const user = await User.findById(userId).populate('tests');

            if (!user) {
                return res.json({
                    message: 'Пользователь не найден'
                })
            }

            return res.status(200).json(user.tests);
        } catch (error) {
            console.log(e);
            res.json({
                message: 'Ошибка на сервере'
            })
        }
        

        
    }
    
}


module.exports = new quizController();