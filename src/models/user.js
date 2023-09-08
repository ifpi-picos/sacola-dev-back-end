const mongoose = require('mongoose');
const { Schema } = mongoose;

const {gameSchema} = require('./game');



const userSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    photo: {
        type: String,
        require: false,
    },
    friends: {
        type: [String],
        require: false,
    },
    games: {
        type: [gameSchema],
        require: false,
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;