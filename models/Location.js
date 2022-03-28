const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'Location address missing'],
    },
    name: {
        type: String,
        required: [true, 'Location name missing'],
        unique: [true, 'Location with this name already exists'],
        trim: true,
    },
    description: {
        type: String,
    },
    phoneNumber: {
        type: String
    },
    website: {
        type: String
    }
})

module.exports = mongoose.models.Location || mongoose.model('Location', LocationSchema)