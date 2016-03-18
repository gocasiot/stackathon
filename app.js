'use strict';
var express = require('express');
var app = express();
var port = '1337';
var basePath = __dirname + '/face-tracking.html';


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(basePath);
});

app.listen(port, function() {
	console.log('Connected to port: ', port);
});