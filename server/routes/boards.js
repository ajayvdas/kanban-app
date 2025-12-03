const express = require('express')
const router = express.Router();
const { getBoards, createBoard, deleteBoard } = require('../controllers/boardController')
const auth  = require ('../middleware/auth')

router.get('/', auth, getBoards)
router.get('/', auth, createBoard)
router.get('/:id', auth, deleteBoard)

module.exports = router;