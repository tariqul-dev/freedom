const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
    },
    city: {
        type: String,
    },
    division: {
        type: String,
    },
    profile_image: {
        type: String,
    },
    cover_image: {
        type: String,
    },
    upload_images: {
        type: [String],
    },
    followers: {
        type: [String],
    },
    followings: {
        type: [String],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true });



const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;


