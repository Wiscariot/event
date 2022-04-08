const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'Location address missing'],
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