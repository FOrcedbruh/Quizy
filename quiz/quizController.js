const Quiz = require("../models/Quiz");
const User = require("../models/User");


const shuffle = (array) => {
    let m = array.length, t, i;

    while(m) {
        i = Math.floor(Math.random() * m--);


        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

   return array;
}

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
    async deleteQuiz(req, res) {
        try {
            const { quizId, userId, index } = req.body;

            const quiz = await Quiz.findByIdAndDelete(quizId);

            const user = await User.findById(userId);

            if (!user) {
                res.status(400).json({
                    message: 'User not found :('
                })
            }

            await user.tests.splice(index, 1);

            await user.save();

            res.status(200).json({
                message: `${quiz.title} successfully deleted ;)`
            });

        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: 'Server error'
            })
        }
        
    }
    async getIdeas(req, res) {
        try {
            const ideas = await Quiz.find();

            const randomIdeas = shuffle(ideas);
            
            

            res.status(200).json(randomIdeas);
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: 'Server error'
            });
        }
    }
}


module.exports = new quizController();