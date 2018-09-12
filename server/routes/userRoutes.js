const express = require('express');
const router = express.Router();
const User = require('../models/User');
const userValid = require('../validation/userValid');
const isempty = require('../utils/isempty');
const bcrypt = require("bcryptjs");
const jwtStrategy = require("jsonwebtoken");
const passport = require("passport")
const keys = require('../config/keys')
const loginValid = require('../validation/loginValid')

router.post('/register', (req, res, next) => {
        let errors = userValid(req.body);
        if (!isempty(errors)) {
            return res.status(400).send(errors);
        }
        let user =  new User(req.body);
        bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
        if(err) return next(err);
        user.password =hash;
            user.save((err, user) => {

                if (err) return next(err);
                res.status(200).end();
            })
        })
    })


})

router.post('/login',(req,res,next) =>{

    let errors = loginValid(req.body);
    if (!isempty(errors)) {
        return res.status(400).send(errors);
    }

    User.findOne({email:req.body.email}).exec((err, user) =>{

        if (err) return next(err);
        if(!user){
            errors.email = "Net takogo emaila";
            return res.status(400).send(errors);
        }

        else {

            bcrypt.compare(req.body.password, user.password,(err, isMatch) => {
                if (err) return next(err)
                //proverka na sovpadenie porolya
                if (!isMatch) {
                errors.password = "Ne pravilno";

                return res.status(400).send(errors);
            }else {
                    const payload = {_id: user._id,
                                        name: user.name,
                                        ava:user.ava}
                    jwtStrategy.sign(
                        payload,
                        keys.jwtKey,
                        {expiresIn:3600}, (err, token) => {
                            if (err) return next(err);
                            res.status(200).send({
                                success: true,
                                token: 'Bearer ' + token
                            });
                     })
                }

            })
        }
    })
})

//if we will have session
router.get('/logout', (req, res, next) => {
    req.logout();
    res.status(200).end();

})



module.exports = router;