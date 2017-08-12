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
app.use(express.static(__dirname + '/src'));
app.set('views', __dirname+'/src');
app.set('view engine', 'ejs');
var idgen1 = new FlakeId();

var routes = require('./api/routes/routes');
routes(app);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
