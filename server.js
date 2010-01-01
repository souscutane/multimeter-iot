var express = require("express");
var pcduino = require("pcduino");
var path = require('path');


var digital = pcduino.digital;
var analog = pcduino.analog;
var app = express();

app.use(express.static('public'))

console.log("There are " + digital.PIN_COUNT + " digital GPIO pins on the pcDuino.");

digital.pinMode(0, digital.OUTPUT); // Set pin #10 to input

// FUNCTION
function average(tab) {
	var count = 0;
	for (var i=0; i < tab.length; i++){
		count += tab[i];
	}
	return count/tab.length;
}

// ROUTAGE 
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

app.get('/analog/', function(req, res){
	var tab = [];
	var tmp;
	for(var i=0; i < 100; i++){
		tmp = analog.analogRead(2);
		tab.push(tmp);
		console.log(tmp);
	}
	var readValue = average(tab);
	// calcul de la	tension
	var v = (readValue*3.3)/4096;
	// calcul de l'intensite
	var i = (v/11.1)*1000;
	var fixed = i.toFixed(2);
	var str = "Valeur : "+fixed;
	res.send(str);
});


app.listen(5000);
