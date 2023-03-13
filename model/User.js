const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    roles: {
        User: {
            type: Number,
            default: 100
        },
        Admin: Number
    },
    password: {
        type: String,
        require: true
    },
    refreshToken: String,
});

module.exports = mongoose.model('User', userSchema);