const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replySchema = new Schema({
    'text': String,
    'created_on': Date,
    'reported': Boolean,
    'delete_password': String
});

const threadSchema = new Schema({
    'text': String,
    'created_on': Date,
    'bumped_on': {type: Date, default: Date.now},
    'reported': Boolean,
    'delete_password': String,
    'replies': [replySchema]
});

const boardSchema = new Schema({
    'title': String,
    'created_on': Date,
    'bumped_on': {type: Date, default: Date.now},
    'reported': Boolean,
    'delete_password': String,
    'threads': [threadSchema]
});

module.exports = mongoose.model('board', boardSchema);
