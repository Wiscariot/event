const mongoose = require('mongoose')

const AnswerSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: [true, 'Answer needs event']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Answer needs user']
    },
    answer: {
        type: String,
        enum: ['YES', 'NO', 'MAYBE'],
    }
})

module.exports = mongoose.models.Answer || mongoose.model('Answer', AnswerSchema)