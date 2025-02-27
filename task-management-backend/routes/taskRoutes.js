const express = require('express');
const { createTask, updateTaskStatus, getAllTasks } = require('../controllers/taskController');
const router = express.Router();

router.post('/', createTask);
router.patch('/:id/status', updateTaskStatus);
router.get('/', getAllTasks);

module.exports = router;
