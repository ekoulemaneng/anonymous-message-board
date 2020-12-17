const threadCrud = require('../models/thread-crud')
const boardCrud = require('../models/board-crud')

let addThread = async (req, res) => {
    try {
        let message = ''
        let boardTitle = req.params.board
        let isBoardExisting = await boardCrud.isBoardExisting(boardTitle)
        if (!isBoardExisting) message = 'Impossible to create this thread because this board doesn\'t exist'
        else {
            let threadText = req.body.threadText
            let threadPassword = req.body.threadPassword
            message = await threadCrud.addThread(boardTitle, threadText, threadPassword)
        }
        res.json({message: message})
    } 
    catch (error) {
        console.log('error: ' + err)
    }
}

let isThreadExisting = async (req, res) => {
    let isExisting = await threadCrud.isThreadExisting(req.query.thread)
    res.json({message: isExisting})
}

let getThreads = async (req, res) => {
    try {
        let boardTitle = req.params.board
        let isBoardExisting = await boardCrud.isBoardExisting(boardTitle)
        if (!isBoardExisting) {
            let message = 'Impossible to get threads because this board doesn\'t exist'
            res.json({message: message})
        }
        else {
            let threads = await threadCrud.getThreads(boardTitle)
            threads = threads.map(thread => {
                let replies = thread['replies']
                replies = replies.sort((replyA, replyB) => replyB['created_on'] - replyA['created_on'])
                replies = replies.slice(0, 10)
                replies = replies.map(reply => {
                    return {
                        id: reply['_id'],
                        board: boardTitle,
                        thread: thread.id,
                        text: reply['text']
                    }
                })
                return {
                    id: thread.id,
                    board: boardTitle,
                    text: thread['text'],
                    replies: replies
                }
            })
            res.render('threads/index', {title: 'List of threads', board: boardTitle, threads: threads})
        }
    } 
    catch (error) {
        console.log('error: ' + err)
    }
}

let reportThread = async (req, res) => {
    try {
        let message = ''
        let boardTitle = req.params.board
        let isBoardExisting = await boardCrud.isBoardExisting(boardTitle)
        if (!isBoardExisting) message = 'Impossible to report this thread because this board doesn\'t exist'
        else {
            let threadId = req.body.threadId
            message = await threadCrud.reportThread(boardTitle, threadId)
        }
        res.json({message: message})
    } 
    catch (error) {
        console.log('error: ' + err)
    }
}

let deleteThread = async (req, res) => {
    try {
        let message = ''
        let boardTitle = req.params.board
        let isBoardExisting = await boardCrud.isBoardExisting(boardTitle)
        if (!isBoardExisting) message = 'Impossible to delete this thread because this board doesn\'t exist'
        else {
            let threadId = req.body.threadId
            let threadPassword = req.body.threadPassword
            message = await threadCrud.deleteThread(boardTitle, threadId, threadPassword)
        }
        res.json({message: message})
    } 
    catch (error) {
        console.log('error: ' + err)
    }
}

module.exports = {
    addThread: addThread,
    isThreadExisting: isThreadExisting,
    getThreads: getThreads,
    reportThread: reportThread,
    deleteThread: deleteThread
}