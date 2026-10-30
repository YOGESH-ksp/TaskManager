const router = require('express').Router();
const { CreateTask, fetchTasks, updateTaskById, deleteTaskById } = require('../Controllers/TaskController');
router.get('/', fetchTasks);
router.post('/', CreateTask);
router.put('/:id', updateTaskById);
router.delete('/:id', deleteTaskById);
module.exports = router;