const replyCrud = require('../models/reply-crud')
const threadCrud = require('../models/thread-crud')
const boardCrud = require('../models/board-crud')

let addReply = async (req, res) => {
    try {
        let message = ''
        let boardTitle = req.params.board
        let isBoardExisting = await boardCrud.isBoardExisting(boardTitle)
        if (!isBoardExisting) message = 'Impossible to create this reply because this board doesn\'t exist'
        else {
            let threadId = req.body.threadId
            let isThreadExisting = await threadCrud.isThreadExisting(boardTitle, threadId)
            if (!isThreadExisting) message = 'Impossible to create this reply because this thread doesn\'t exist'
            else {
                let replyText = req.body.replyText
                let replyPassword = req.body.replyPassword
                message = await replyCrud.addReply(boardTitle, threadId, replyText, replyPassword)
            }
        }
        res.json({message: message})
    } 
    catch (error) {
        console.log('error: ' + err)
    }
}

let getReplies = async (req, res) => {
    try {
        let message = ''
        let boardTitle = req.params.board
        let isBoardExisting = await boardCrud.isBoardExisting(boardTitle)
        if (!isBoardExisting) {
            message = 'Impossible to get replies because this board doesn\'t exist'
            res.json({message: message})
        }
        else {
            let threadId = req.query.thread
            let isThreadExisting = await threadCrud.isThreadExisting(boardTitle, threadId)
            if (!isThreadExisting) {
                message = 'Impossible to get replies because this thread doesn\'t exist'
                res.json({message: message})
            }
            else {
                let threads = await threadCrud.getThreads(boardTitle)
                let thread = threads.find(thread => thread['id'] == threadId)
                let replies = await replyCrud.getReplies(boardTitle, threadId)
                replies = replies.map(reply => { return {replyId: reply['id'], replyText: reply['text']} })
                res.render('replies/index', {title: 'List of replies', board: boardTitle, threadId: threadId, threadText: thread['text'], replies: replies})
            }
        }
    } 
    catch (error) {
        console.log('error:' + err)
    }
}

let reportReply = async (req, res) => {
    try {
        let message = ''
        let boardTitle = req.params.board
        let isBoardExisting = await boardCrud.isBoardExisting(boardTitle)
        if (!isBoardExisting) message = 'Impossible to report this reply because this board doesn\'t exist'
        else {
            let threadId = req.body.threadId
            let isThreadExisting = await threadCrud.isThreadExisting(boardTitle, threadId)
            if (!isThreadExisting) message = 'Impossible to report this reply because this thread doesn\'t exist'
            else {
                let replyId = req.body.replyId
                message = await replyCrud.reportReply(boardTitle, threadId, replyId)
            }
        }
        res.json({message: message})
    } 
    catch (error) {
        console.log('error:' + err)
    }
}

let deleteReply = async (req, res) => {
    try {
        let message = ''
        let boardTitle = req.params.board
        let isBoardExisting = await boardCrud.isBoardExisting(boardTitle)
        if (!isBoardExisting) message = 'Impossible to delete this reply because this board doesn\'t exist'
        else {
            let threadId = req.body.threadId
            let isThreadExisting = await threadCrud.isThreadExisting(boardTitle, threadId)
            if (!isThreadExisting) message = 'Impossible to delete this reply because this thread doesn\'t exist'
            else {
                let replyId = req.body.replyId
                let replyPassword = req.body.replyPassword
                message = await replyCrud.deleteReply(boardTitle, threadId, replyId, replyPassword)
            }
        }
        res.json({message: message})
    } 
    catch (error) {
        console.log('error:' + err)
    }
}

module.exports = {
    addReply: addReply,
    getReplies: getReplies,
    reportReply: reportReply,
    deleteReply: deleteReply
}