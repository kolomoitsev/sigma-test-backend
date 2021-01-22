const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Mark = new Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    markString: String,
}, {
    timestamps: true,
})

const MarkModel = new mongoose.model('Mark', Mark);

module.exports = MarkModel;