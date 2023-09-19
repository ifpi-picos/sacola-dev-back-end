const mongoose = require('mongoose');
const {Schema} = mongoose;


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
    userFriends: {
        friends_total: {
            type: Number,
            default: 0,
        },
        friends: [{
            type: String,
            ref: 'User',
        }]
    },
    userGames: {
        games_total: {
            type: Number,
            default: 0,
        },
        games: [{
            type: Object,
        }]
    },
    storeKeys: {
        steam: {
            type: String,
        }
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;