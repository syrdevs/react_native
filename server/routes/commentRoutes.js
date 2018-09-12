const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');
const commentValid = require('../validation/commentValid');
const isempty = require('../utils/isempty');
const passport = require('passport');

router.post('/', passport.authenticate('jwt', {session: false}),(req,res,next) =>{
    let errors = commentValid(req.body);
    if (!isempty(errors)) {
        return res.status(400).send(errors);
    }
    else {
        let comment = new Comment(req.body);
        comment.author = req.user._id;
        comment.save((error)=>{
            if(error) return next(error);
            Blog.findById(req.body.blogid).exec((errors, data) => {
                if(error) return next(error);
                data.comments.push(comment);
                data.save(errors => {
                    if(error) return next(error);
                    res.status(200).send(comment);
                });

            })
        })

    }
})

router.delete('/:id/:blogid', passport.authenticate('jwt', {session: false}),(req,res,next) =>{
    Blog.findById(req.params.blogid).exec((err, blog) => {
        if(err) return next(err);

        Comment.findById(req.params.id).exec((err, comment) => {
        if ((blog && comment) && (blog.author.toString() == req.user._id.toString() || comment.author.toString() == req.user._id.toString())) {

            let indexcomment = blog.comments.indexOf(req.params.id);

            blog.comments.splice(indexcomment,1)
            blog.save(err=>{
                if(err) return next(err);
                Comment.remove({_id: req.params.id}).exec(err =>{
                    if(err) return next(err);
                    res.status(200).end();
                });
            });
        }
        else {
            res.status(400).send({msg: 'Access denied'});
        }
        })
    });
});

module.exports = router;