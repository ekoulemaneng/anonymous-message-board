const boardCrud = require('../models/board-crud');

module.exports = {

    addBoard: async (req, res) => {
        let title = req.body.title
        let password = req.body.password
        let message = await boardCrud.addBoard(title, password)
        res.json({message: message})
    },

    isBoardExisting: async (req, res) => {
        let isExisting = await boardCrud.isBoardExisting(req.query.board)
        res.json({message: isExisting})
    },

    getBoards: async (req, res) => {
        let data = await boardCrud.getBoards()
        res.render('boards/index', {title: 'List of boards', boards: data});
    },

    reportBoard: async (req, res) => {
        let title = req.body.title
        let message = await boardCrud.reportBoard(title)
        res.json({message: message})
    },

    deleteBoard: async (req, res) => {
        let title = req.body.title
        let password = req.body.password
        let message = await boardCrud.deleteBoard(title, password)
        res.json({message: message});
    }

}