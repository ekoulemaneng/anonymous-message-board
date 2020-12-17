const express = require('express');
const router = express.Router();
const replyController = require('../controllers/reply-controller');

router.post('/:board', replyController.addReply)
router.get('/:board', replyController.getReplies)
router.put('/:board', replyController.reportReply)
router.delete('/:board', replyController.deleteReply)

module.exports = router;