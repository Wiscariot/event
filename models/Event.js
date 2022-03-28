const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Event name missing'],
        unique: [true, 'Event with this name already exists'],
        trim: true,
    },
    startTime: {
        type: Date,
        required: [true, 'Add starting time for event']
    },
    endTime: {
        type: Date,
    },
    description: {
        type: String,
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: [true, 'add location for event']
    },
    rsvp: {
        answers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Answer',
            }
        ]
    }
})

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema)