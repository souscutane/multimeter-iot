var express = require("express");
var pcduino = require("pcduino");
var path = require('path');


var digital = pcduino.digital;
var app = express();

app.use(express.static('public'))

console.log("There are " + digital.PIN_COUNT + " digital GPIO pins on the pcDuino.");

digital.pinMode(0, digital.OUTPUT); // Set pin #10 to input

app.get('/', function(req, res){
	
	res.sendFile(path.join(__dirname + 'public/index.html'));

});

app.get('/on/', function(req, res){
	digital.digitalWrite(0, digital.HIGH);
	res.end();	
});

app.get('/off/', function(req, res){
	digital.digitalWrite(0, digital.LOW);
	res.end();
});

app.listen(5000);
