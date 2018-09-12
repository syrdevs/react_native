const mongoose = require('mongoose');

const CommentScheme =  new mongoose.Schema({
    text: String,
    author: {type: mongoose.Schema.ObjectId, ref: 'User'},
    date: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('Comment', CommentScheme);