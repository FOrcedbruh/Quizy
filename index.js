const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRouter = require('./auth/authRouter');
const quizRouter = require('./quiz/quizRouter');


dotenv.config();


const origin = process.env.CLIENT_ORIGIN;


const app = express();


app.use(cors({
    origin,
    credentials: true
}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());

// routes 

app.use('/auth', authRouter);
app.use('/quiz', quizRouter);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({
        message: 'Hello'
    })
});

const db_url = process.env.DB_URL;

const start = async () => { 
    try {
        mongoose.connect(db_url).then(() => {
            console.log('Подключено к дб');
        });
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('Ошибка', error);
    }
}

start();


