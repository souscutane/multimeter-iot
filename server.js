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
	res.send('La led a ete alumee');	
});

app.get('/off/', function(req, res){
	digital.digitalWrite(0, digital.LOW);
	res.send('la led a ete eteinte');
});

app.get('/state/', function(req, res){
	
	var state =  digital.digitalRead(0);
	res.json({
		'state': state
	});

});

app.listen(5000);
