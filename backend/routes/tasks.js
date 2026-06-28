const express = require('express');
const router = express.Router();
const { taskValidation } = require('../middleware/validate');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', taskValidation, createTask);
router.put('/:id', taskValidation, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
