const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board-controller');

router.post('/boards', boardController.addBoard)
router.get('/boards', boardController.getBoards)
router.put('/boards', boardController.reportBoard)
router.delete('/boards', boardController.deleteBoard)

router.get('/board', boardController.isBoardExisting)

module.exports = router; 