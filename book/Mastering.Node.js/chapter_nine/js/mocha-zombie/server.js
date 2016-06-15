var express	= require('express');
var app 	= express();

app
.use(express.compress())
.use(express.static('public/'))
.use(express.bodyParser())

module.exports = app