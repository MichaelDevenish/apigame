'use strict';

var express = require('express');
var intformat = require('biguint-format');
var FlakeId = require('flake-idgen');
var fs = require('fs');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
var idgen1 = new FlakeId();
app.get('/', (req, res) => {
        //testing if files have been added to the docker correctly
        var contents = fs.readFileSync('src/test.txt','utf8');
        //testing id generation
        var id = intformat(idgen1.next(),'hex');
        res.send('Your unique API key is:' + id + ' Ctest:'+contents );
        //show a help page
});

app.get('/j/:tagId/:tag1/:tag2', function(req, res) {
		//access the main game using ip/apikey?input=value e.g http://13.59.173.76/577469cf19400000/test/a
        var a = req.params.tagId;
        var b = req.params.tag1;
        var c = req.params.tag2;
        var obj = new Object();
        obj.APIkey = a;
        obj.input = b;
        obj.command = c;
        res.json(obj);
});

app.get('/j/:tagId/:tag1', function(req, res) {
		//access the main game using ip/apikey?input=value e.g http://13.59.173.76/577469cf19400000/test
        var a = req.params.tagId;
        var b = req.params.tag1;
        var obj = new Object();
        obj.APIkey = a;
        obj.input = b;
        res.json(obj);
});

app.get('/:tagId/:tag1/:tag2', function(req, res) {
		//access the main game using ip/apikey?input=value e.g http://13.59.173.76/577469cf19400000/test/a
        var a = req.params.tagId;
        var b = req.params.tag1;
        var c = req.params.tag2;
        if(b == undefined){
                res.send("please enter a query");
        }else{
                res.send('The input you provided is: ' + b + '\nUsing the key: ' + a + '\nand command: ' + c);
        }
});

app.get('/:tagId/:tag1', function(req, res) {
		//access the main game using ip/apikey?input=value e.g http://13.59.173.76/577469cf19400000/test
        var a = req.params.tagId;
        var b = req.params.tag1;
        if(b == undefined){
                res.send("please enter a query");
        }else{
                res.send('The input you provided is: ' + b + '\nUsing the key: ' + a);
        }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
