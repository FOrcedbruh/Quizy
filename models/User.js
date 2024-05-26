const { Schema, model, default: mongoose } = require('mongoose');



const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default: ''
    },
    tests: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Quiz',
            default: []
        }
    ]
});

module.exports = model('User', UserSchema);



