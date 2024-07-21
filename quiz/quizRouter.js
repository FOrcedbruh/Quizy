const express = require('express');
const quizRouter = express.Router();
const quizController = require('./quizController');
const protectedRoute = require('./../middleware/protectedRoute');


quizRouter.post('/create', protectedRoute,  quizController.createQuiz);
quizRouter.post('/get/:quizId', quizController.getQuiz);
quizRouter.post('/allQuizzes', protectedRoute, quizController.getQuizzes);
quizRouter.post('/delete', protectedRoute, quizController.deleteQuiz)

module.exports = quizRouter;