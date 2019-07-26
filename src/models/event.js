const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    finishDate: {
        type: Date
    },
    supervisor: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('Event', eventSchema);