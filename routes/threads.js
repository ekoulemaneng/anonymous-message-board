const express = require('express');
const router = express.Router();
const threadController = require('../controllers/thread-controller');

router.post('/:board', threadController.addThread)
router.get('/:board', threadController.getThreads)
router.put('/:board', threadController.reportThread)
router.delete('/:board', threadController.deleteThread)

router.get('/:board/thread', threadController.isThreadExisting)

module.exports = router;