const Board = require('./boardModel')

let addThread = async (boardTitle, threadText, threadPassword) => {
    try {
        let board = await Board.findOne({'title': boardTitle})
        let threads = board['threads']
        let thread = threads.find(thread => thread['text'] == threadText)
        let isExisting = thread ? true : false
        if (isExisting) return 'This thread already exists on this board ! Please, create a new one.'
        else {
            let board = await Board.findOne({'title': boardTitle})
            board['bumped_on'] = Date.now()
            board['threads'].push({
                'text': threadText,
                'created_on': Date.now(),
                'bumped_on': Date.now(),
                'reported': false,
                'delete_password': threadPassword,
                'replies': []
            })
            await board.save()
            return 'The thread has been successfully created!'
        }
     }
    catch(err) {
        console.log('error: ' + err)
    }
}

let isThreadExisting = async (boardTitle, threadId) => {
    try {
        let board = await Board.findOne({'title': boardTitle})
        let threads = board['threads']
        let thread = threads.find(thread => thread['_id'] == threadId)
        let isExisting = thread ? true : false 
        return isExisting
    }
    catch(err) {
        console.log('error: ' + err)
    }
}

let getThreads = async (boardTitle) => {
    try {
        let board = await Board.findOne({'title': boardTitle})
        let threads = board['threads']
        threads = threads.map(thread => { return {'id': thread['_id'], 'text': thread['text'], 'replies': thread['replies']}})
        return threads
    } 
    catch (error) {
        console.log('error: ' + err) 
    }
}

let reportThread = async (boardTitle, threadId) => {
    try {
        let isExisting = await isThreadExisting(boardTitle, threadId)
        if (!isExisting) return 'This thread doesn\'t exist.'
        else {
            let board = await Board.findOne({'title': boardTitle})
            let thread = board['threads'].find(thread => thread['_id'] == threadId)
            thread['reported'] = true
            await board.save()
            return 'The thread has been successfully reported!'
        }
    } 
    catch(err) {
        console.log('error: ' + err)
    }
}

let deleteThread = async (boardTitle, threadId, threadPassword) => {
    try {
        let isExisting = await isThreadExisting(boardTitle, threadId)
        if (!isExisting) return 'This thread doesn\'t exist.'
        else {
            let board = await Board.findOne({'title': boardTitle})
            let threads = board['threads']
            let thread = threads.find(thread => thread['_id'] == threadId)
            console.log(threadPassword)
            console.log(thread['delete_password'])
            if (thread['delete_password'] !== threadPassword) return 'The password is wrong.'
            else {
                threads = threads.filter(thread => thread['delete_password'] !== threadPassword)
                board['threads'] = threads
                await board.save()
                return 'The thread has been successfully deleted!'
            }
        }
    } 
    catch(err) {
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