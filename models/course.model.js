const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Course = new Schema({
    courseName: {
        type: String,
        unique: true,
    },
    courseDescription: String,
    courseMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true,
})

const CourseModel = new mongoose.model('Course', Course);

module.exports = CourseModel;