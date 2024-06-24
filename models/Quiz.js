const { Schema, model, default: mongoose } = require('mongoose');



const StepSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answers: [
        {
            type: String,
            required: true
        }
    ],
    correct: {
        type: Number,
        required: true
    }
})



const QuizSchema = new Schema({
    mainColor: {
        type: String,
        required: true,
    },
    textColor: {
        type: String,
        required: true,
    },
    listColor: {
        type: String,
        required: true,
    },
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    categoryName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    body: [StepSchema]
});


module.exports = model('Quiz', QuizSchema);