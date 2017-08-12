
'use strict';

var express = require('express');
var intformat = require('biguint-format');
var FlakeId = require('flake-idgen');
var fs = require('fs');
var weaponz = require('./src/weaponz.js');
var player = require('./src/player.js');
var game = require('./src/game.js');
// var sqlite3 = require('sqlite3').verbose();

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.static(__dirname + '/src'));
app.set('views', __dirname+'/src');
app.set('view engine', 'ejs');
var idgen1 = new FlakeId();

app.get('/', (req, res) => {
        // var db = new sqlite3.Database('databeets_of_politeness.db');
    var id = intformat(idgen1.next(),'hex');
    game.beginGame(id);
    var contents = fs.readFileSync('src/weaponz.js','utf8');
    res.render('else',{id: id});
});

app.get('/:tagId', function(req, res) {
        ///access the main game using ip/apikey?input=value e.g http://13.59.173.76/577469cf19400000/test/a
        output = game.apiHelp(req.params.tagId);
        var json = req.query.json;
        //what a callback looks like
        game.apiEchoDatabase(function(vara){
            layout(vara, res, json);
        });
});

app.get('/:tagId/:tag1/:tag2', function(req, res) {
        //access the main game using ip/apikey?input=value e.g http://13.59.173.76/577469cf19400000/test/a
        var output = null;
        switch(req.params.tag1){
            case 'attack':
                game.apiAttack(req.params.tagId,req.params.tag2,function(vara){
                    layout(vara, res, req.query.json);
                });
                break;
            case 'equip':
                game.apiEquip(req.params.tagId,req.params.tag2,function(vara){
                    layout(vara, res, req.query.json);
                });
                break;
            case 'move':
            case 'go':
                game.apiGo(req.params.tagId,req.params.tag2,function(vara){
                    layout(vara, res, req.query.json);
                });
                break;
        }
});

function layout (output, res, json){
     if(json != 'true'){
            res.render('else',{id: output[0]});

        }else{
                res.json(output[1]);
        }
}

app.get('/:tagId/:tag1', function(req, res) {
                //access the main game using ip/apikey?input=value e.g http://13.59.173.76/577469cf19400000/test
        var json = req.query.json;
        var output = null;
        switch(req.params.tag1){
            case 'killme':
                game.apiKillMe(req.params.tagId,function(vara){
                    layout(vara, res, req.query.json);            
                });
                break;
            case 'help':
                game.apiHelp(req.params.tagId,function(vara){
                    layout(vara, res, req.query.json);
                });
                break;
        }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
