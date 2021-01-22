const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Task = new Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    taskName: String,
    taskDescription: String,
    taskStart: Date,
    taskEnd: Date,
    taskStatus: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
})

const TaskModel = new mongoose.model('Task', Task);

module.exports = TaskModel;