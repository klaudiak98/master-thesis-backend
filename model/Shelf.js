const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shelfSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
        unique: true
    },
    wantToRead: {
        type: [String]
    },
    currentlyReading: {
        type: [String],
    },
    read: {
        type: [String],
    },
});

module.exports = mongoose.model('Shelf', shelfSchema);