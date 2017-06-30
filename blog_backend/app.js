var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.get('/', function(req, res){
    res.send('Hello World');
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); 

//connect to mongodb server
var config =require('./config.js');
mongoose.connect(config.mongoAuth);

var db=mongoose.connection;
db.on('error',console.error);
db.once('open',function(){
    console.log('connected to mongod server');
});

//define model

var motionLab=require('./routes');
app.use('/motionLab',motionLab);

var port = process.env.PORT || 4000;
var server=app.listen(port,function(){
    console.log("Express server has started on port " + port)
});
