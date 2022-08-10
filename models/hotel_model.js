const mongoose = require('mongoose');
const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    type: {
        type: String,
    },
    location: {
        type: String,
    },
    city: {
        type: String,
    },
    division: {
        type: String,
    },

    rooms: {
        type: [String],
    },
    photos: {
        type: [String],
    },
}, { timestamps: true });

const HotelModel = mongoose.model('Hotel', hotelSchema);
module.exports = HotelModel;