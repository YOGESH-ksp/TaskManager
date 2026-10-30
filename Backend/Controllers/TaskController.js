const TaskModel = require('../Models/TaskModel');

const CreateTask = async(req, res) => {
    const data = req.body;
    try {

        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({ message: 'Task is created', success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const fetchTasks = async(req, res) => {
    try {
        const data = await TaskModel.find({});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTaskById = async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: {...body } }
    try {
        const data = await TaskModel.findByIdAndUpdate(id, obj); // ✅
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTaskById = async(req, res) => {
    const id = req.params.id;
    try {
        const data = await TaskModel.findByIdAndDelete(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { CreateTask, fetchTasks, updateTaskById, deleteTaskById };