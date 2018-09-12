const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const PORT = process.env.PORT || 5000

/*const path = require('path');*/
//mongoose.connect("mongodb://127.0.0.1:27017/mean_lessons");
mongoose.connect("mongodb://root:Qwerty123@ds151892.mlab.com:51892/reactdb");


const app = express();
// show status and console log in terminal
app.use(logger('dev'));
// jsons to req.bodymodule


app
  .use(express.static(path.join(__dirname, 'public')))
  //.set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  
  
app.use(bodyParser.urlencoded({limit:'50mb', extended: true}));
//max size of requests
app.use(bodyParser.json({limit:'50mb'}));
/*
app.get('/api/hello',(req,res) => {
    res.status(200).send({msg:"WORK!"});
});
*/

app.use(require("./server/routes"));


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


//app.use(express.static(path.join(__dirname,"client/build"),{maxAge:1}))




//app.listen(80, ()=>console.log("Server on port 80 ozgertik"));