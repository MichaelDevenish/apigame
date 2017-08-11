'use strict';

var express = require('express');
var intformat = require('biguint-format');
var FlakeId = require('flake-idgen');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
var idgen1 = new FlakeId();

// App
const app = express();
app.get('/', (req, res) => {
	//generates a random hexadecimal
	//show a help page
	var id = intformat(idgen1.next(),'hex');
  	res.send('Your unique API key is:' + id);
});

app.get('/:tagId', function(req, res) {
	//access the main game using ip/apikey?input=value e.g http://13.59.173.76/577469cf19400000?input=test
	var a = req.params.tagId;
	var b = req.query.input;
	if(b == undefined){
		res.send("please enter a query");
	}else{
		res.send('The input you provided is: ' + b + 'Using the key: ' + a);
	}
}); 

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);