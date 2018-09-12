const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
mongoose.connect("mongodb://127.0.0.1:27017/mean_lessons");

const app = express();
// show status and console log in terminal
app.use(logger('dev'));
// jsons to req.bodymodule
app.use(bodyParser.urlencoded({limit:'50mb', extended: true}));
//max size of requests
app.use(bodyParser.json({limit:'50mb'}));

/*app.get('/api/hello',(req,res) => {
    res.status(200).send({msg:"WORK!"});
})*/

app.use(express.static(path.join(__dirname,"client/build"),{maxAge:1}))

app.use(require("./server/routes"));


app.listen(3001, ()=>console.log("Server on port 3000"));