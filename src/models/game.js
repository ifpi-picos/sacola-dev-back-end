const mongoose = require('mongoose');
const {Schema} = mongoose;

const gameSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    infos: {
        type: Object,
    },
}, {timestamps: true});

const Game = mongoose.model('Game', gameSchema);

module.exports = {
    Game,
    gameSchema
}