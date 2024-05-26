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
    bgColor: {
        type: String,
        required: false,
        default: '#fff'
    },
    textColor: {
        type: String,
        required: false,
        default: '#000'
    },
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    category: {
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