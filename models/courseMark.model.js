const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseMark = new Schema({
    courseWorkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    courseMarkString: String,
}, {
    timestamps: true,
})

const CourseMarkModel = new mongoose.model('CourseMark', CourseMark);

module.exports = CourseMarkModel;