const mongoose = require("mongoose");
var deepPopulate = require('mongoose-deep-populate')(mongoose);

const  blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: {type: Date, default: Date.now()},
    author: {type:mongoose.Schema.ObjectId, ref:'User'},
    comments: [{type: mongoose.Schema.ObjectId, ref: 'Comment'}],
    image: String
});
blogSchema.plugin(deepPopulate,{
    populate: {
        'comments.author': {
            select: 'name ava'
        },
        'author': {
            select: 'name ava'
        }
    }
});



module.exports = mongoose.model("Blog", blogSchema);