'use strict';

var express = require('express'),
    intformat = require('biguint-format'),
    FlakeId = require('flake-idgen'),
    fs = require('fs'),
    weaponz = require('./src/weaponz.js'),
    mongoose = require('mongoose'),
    Game = require('./api/models/model'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Game');

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
