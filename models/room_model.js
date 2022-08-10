const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumbers: [
        {
            number: Number,
            unabailableDates:
            {
                type: [Date]
            }

        }
    ],
    description: {
        type: String,
    },
    title: {
        type: String,
    },

    status: {
        type: String,
    },

    maxCapacity: {
        type: Number,
    },

    price: {
        type: Number,
    },

    photos: {
        type: [String],
    },
}, { timestamps: true });

const RoomModel = mongoose.model('Room', roomSchema);

module.exports = RoomModel;