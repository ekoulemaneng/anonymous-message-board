const Board = require('./boardModel')

let addReply = async (boardTitle, threadId, replyText, replyPassword) => {
    try {
            let board = await Board.findOne({'title': boardTitle})
            let thread = board['threads'].find(thread => thread['id'] == threadId)
            let replies = thread['replies']
            replies.push({
                'text': replyText,
                'created_on': Date.now(),
                'reported': false,
                'delete_password': replyPassword
            })
            thread['bumped_on'] = Date.now()
            await board.save()
            return 'The reply has been successfully created!'
     }
    catch(err) {
        console.log('error: ' + err)
    }
}

let isReplyExisting = async (boardTitle, threadId, replyId) => {
    try {
        let board = await Board.findOne({'title': boardTitle})
        let thread = board['threads'].find(thread => thread['id'] == threadId)
        let replies = thread['replies']
        let isExisting = replies.find(reply => reply['id'] == replyId) != undefined ? true : false 
        return isExisting
    }
    catch(err) {
        console.log('error: ' + err)
    }
}

let getReplies = async (boardTitle, threadId) => {
    try {
        let board = await Board.findOne({'title': boardTitle})
        let thread = board['threads'].find(thread => thread['id'] == threadId)
        let replies = thread['replies'].map(reply => { return {'id': reply['_id'], 'text': reply['text']}}) 
        return replies
    } 
    catch (error) {
        console.log('error: ' + err) 
    }
}

let reportReply = async (boardTitle, threadId, replyId) => {
    try {
        let isExisting = await isReplyExisting(boardTitle, threadId, replyId)
        if (!isExisting) return 'This reply doesn\'t exist.'
        else {
            let board = await Board.findOne({'title': boardTitle})
            let thread = board['threads'].find(thread => thread['id'] == threadId)
            let reply = thread['replies'].find(reply => reply['id'] == replyId)
            reply['reported'] = true
            await board.save()
            return 'The reply has been successfully reported!'
        }
    } 
    catch(err) {
        console.log('error: ' + err)
    }
}

let deleteReply = async (boardTitle, threadId, replyId, replyPassword) => {
    try {
        let isExisting = await isReplyExisting(boardTitle, threadId, replyId)
        if (!isExisting) return 'This reply doesn\'t exist.'
        else {
            let board = await Board.findOne({'title': boardTitle})
            let thread = board['threads'].find(thread => thread['id'] == threadId)
            let reply = thread['replies'].find(reply => reply['id'] == replyId)
            if (reply['delete_password'] !== replyPassword) return 'The password is wrong.'
            else {
                let replies = thread['replies'].filter(reply => reply['id'] !== replyId)
                thread['replies'] = replies
                await board.save()
                return 'The reply has been successfully deleted!'
            }
        }
    } 
    catch(err) {
        console.log('error: ' + err)
    }
}

module.exports = {
    addReply: addReply,
    isReplyExisting: isReplyExisting,
    getReplies: getReplies,
    reportReply: reportReply,
    deleteReply: deleteReply
}