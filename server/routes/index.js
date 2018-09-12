const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use(passport.initialize());
require('../config/passport')(passport);



router.use('/api/blog', require('./blogRoutes'));
router.use('/api/user', require('./userRoutes'));
router.use('/api/comment', require('./commentRoutes'));


router.use((err, req, res, next) => {
    if (err) {
        res.status(500).send({msg:err.message});
    }
    next();
})

module.exports = router;