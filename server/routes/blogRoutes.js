const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');
const blogValid = require('../validation/blogVaild');
const isempty = require('../utils/isempty');
const passport = require('passport');
const path = require('path');

//moveing file
const fs = require('fs');
//write file
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

router.post('/', passport.authenticate('jwt', {session: false}),upload.single("image"), (req,res,next) =>{
   let errors = blogValid.createblog(req.body, req.file);
   if (!isempty(errors)) {
       return res.status(400).send(errors);
   }
   else {
       let blog = new Blog(req.body);
       //Saving user gor blog
       blog.author = req.user;

       const tempPath = req.file.path;
       const dateforfile = req.user.name+Date.now()+'.'+req.file.originalname.split('.')
           .slice(-1).pop();
       const targetPath = path.resolve('client/public/images/blogimages/'+ dateforfile.replace(/ /g,""));
       fs.rename(tempPath, targetPath, (errors) => {
           if (errors) return next(errors);
           blog.image = "images/blogimages/"+dateforfile.replace(/ /g,"");
           blog.save((error, blog) =>{
               if(error) return next(error);
               res.status(200).send(blog);
           })
       })

   }

});

router.get ('/', (req, res, next) => {
    Blog.find().populate('author','name ava').exec((err, blogs) => {
        if(err) return next(err);
        res.status(200).send(blogs);
    });
})

router.get ('/:key/search', (req, res, next) => {
    Blog.find({
        //$or prekin on kak ili
        //&and eto i
        $or: [
            {
                //like cherez regexp ne ponimaiu no tak dolzhno bit
                title: new RegExp(req.params.key, "i")
            },{
                description: new RegExp(req.params.key, "i")
            }
        ]
    }).exec((err, blogs) => {
        if(err) return next(err);
        res.status(200).send(blogs);
    });
})

router.get ('/:id', (req, res, next) => {
    Blog.findById(req.params.id).deepPopulate(['comments.author', 'author']).exec((err, blogs) => {
        if(err) return next(err);
        res.status(200).send(blogs);
    });
})

router.put ('/', passport.authenticate('jwt', {session: false}), upload.single("img"),(req, res, next) => {
    console.log(req.body);
    let errors = blogValid.editblog(req.body);
    if (!isempty(errors)) {
        return res.status(400).send(errors);
    }
    else {
        if (req.file && req.file.filename) {
            //delete exist image
            Blog.findById(req.body._id).exec((err, blog) => {
                fs.unlink(path.resolve("client/public/"+blog.image), err=> {
                        const tempPath = req.file.path;
                        const dateforfile = req.user.name+Date.now()+'.'+req.file.originalname.split('.').slice(-1).pop();
                        const targetPath = path.resolve('client/public/images/blogimages/'+ dateforfile.replace(/ /g,""));
                        fs.rename(tempPath, targetPath, (errors) => {
                            if (errors) return next(errors);

                                if(err) return next(error);
                                blog.title = req.body.title;
                                blog.description = req.body.description;
                                blog.save((err, blog) => {
                                    if(err) return next(err);
                                    res.status(200).send(blog);
                                });
                        });
                })
            });
        }
        else  {
            Blog.findById(req.body._id).exec((err, blog) => {
                if(err) return next(error);
                    blog.title = req.body.title;
                    blog.description = req.body.description;
                    blog.save((err, blog) => {
                        if(err) return next(err);
                        res.status(200).send(blog);
                    });
            });
        }
    }
})

router.put ('/second', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    let errors = blogValid(req.body);
    if (!isempty(errors)) {
        return res.status(400).send(errors);
    }
    else {
        Blog.update({_id: req.body._id}, {$set: {
                title: req.body.title,
                description:req.body.description,
                image: targetPath
            }}).exec((err, blog) => {
            if(err) return next(err);
            res.status(200).send(blog);
        });

    }
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    Blog.findById(req.params.id).exec((err, blog) =>{
        Comment.remove({_id: {$in:blog.comments}}).exec((err)=>{
            if(req.user._id.toString() == blog.author.toString()) {
                Blog.remove({_id: req.params.id}).exec((err) => {
                    if(err) return next(err);
                    res.status(200).end();
                });
            }
            else
            {
                res.status(400).send({msg: 'Access denied'});
            }

        })
    });
});

module.exports = router;