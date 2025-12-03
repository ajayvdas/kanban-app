const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');


router.get('/:boardId', auth, getTasks);
router.get('/', auth, createTask);
router.get('/:id', auth, updateTask);
router.get('/:id', auth, deleteTask);

module.exports = router;

