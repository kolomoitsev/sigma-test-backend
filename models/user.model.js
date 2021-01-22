const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    userName: String,
    userEmail: {
        type: String,
        unique: true,
    },
    userPassword: String,
    userBirth: Date,
}, {
    timestamps: true,
})

const UserModel = new mongoose.model('User', User);

module.exports = UserModel;