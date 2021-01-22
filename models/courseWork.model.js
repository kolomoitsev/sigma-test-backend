const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseWork = new Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    courseWorkTheme: {
        type: String,
        unique: true,
    },
    courseWorkDescription: String,
    courseMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true,
})

const CourseWorkModel = new mongoose.model('CourseWork', CourseWork);

module.exports = CourseWorkModel;