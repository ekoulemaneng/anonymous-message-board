const Board = require('./boardModel');

let addBoard = async (title, delete_password) => {
    try {
        let isExisting = await isBoardExisting(title)
        if (isExisting) return 'This board title already exists ! Please, create a new one.'
        else {
            let board = new Board({
                'title': title, 
                'created_on': Date.now(), 
                'bumped_on': Date.now(), 
                'reported': false, 
                'delete_password': delete_password, 
                'threads':[]
            });
            await board.save(err => {
                if (err) console.error(err);
                else console.log('New board added!');
            });
            return 'The board title has been successfully created!'
        }
     }
    catch(err) {
        console.log('error: ' + err)
    }
}

let isBoardExisting = async (title) => {
    try {
        let isExisting = await Board.exists({'title': title})
        return isExisting
    }
    catch(err) {
        console.log('error: ' + err)
    }
}

let getBoards = async () => {
    try {
        let boards = await Board.find({}).select('title reported')
        return boards
    } 
    catch (error) {
        console.log('error: ' + err) 
    }
}

let reportBoard = async (title) => {
    try {
        let isExisting = await isBoardExisting(title)
        if (!isExisting) return 'This board title doesn\'t exist.'
        else {
            await Board.findOneAndUpdate({'title': title}, {'reported': true})
            return 'The board has been successfully reported!'
        }
    } 
    catch(err) {
        console.log('error: ' + err)
    }
}

let deleteBoard = async (title, password) => {
    try {
        let isExisting = await isBoardExisting(title)
        if (!isExisting) return 'This board title doesn\'t exist.'
        else {
            let board = await Board.findOne({'title': title})
            if (board['delete_password'] !== password) return 'The password is wrong.'
            else {
                await Board.findOneAndDelete({'title': title})
                return 'The board has been successfully deleted!'
            }
        }
    } 
    catch(err) {
        console.log('error: ' + err)
    }
}

module.exports = {
   addBoard: addBoard,
   isBoardExisting: isBoardExisting,
   getBoards: getBoards,
   reportBoard: reportBoard,
   deleteBoard: deleteBoard
}