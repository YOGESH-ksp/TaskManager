const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    taskName: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    }
});

const TaskModel = mongoose.model('PostTask', taskSchema, 'postTasks');
module.exports = TaskModel;