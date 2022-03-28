const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required'],
        unique: [true, 'User with same name already exists'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Add password'],
        minLength: [8, 'Password should be atleast 8 marks']
    },
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)