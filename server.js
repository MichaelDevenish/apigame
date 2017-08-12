
'use strict';

var express = require('express');
var intformat = require('biguint-format');
var FlakeId = require('flake-idgen');
var fs = require('fs');
var weaponz = require('./src/weaponz.js');
var player = require('./src/player.js');
var sqlite3 = require('sqlite3').verbose();

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

		var db = new sqlite3.Database('mydb.db');
		var check;
		var id = intformat(idgen1.next(),'hex');
		db.serialize(function() {

		  db.run("CREATE TABLE if not exists user_info (info TEXT)");
		  var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
		      stmt.run(id);
		  
		  stmt.finalize();
		});

		db.close();
        //testing if files have been added to the docker correctly
        var contents = fs.readFileSync('src/weaponz.js','utf8');
        //testing id generation
       // res.send('Your unique API key is:' + id + ' Ctest:'+contents );
       res.render('else',{id: id, contents: JSON.stringify(player.createPlayer())});
});

app.get('/:tagId/:tag1/:tag2', function(req, res) {
                //access the main game using ip/apikey?input=value e.g http://13.59.173.76/577469cf19400000/test/a
        var db = new sqlite3.Database('mydb.db');
		var check;
		db.serialize(function() {
		   db.each("SELECT rowid AS id, info FROM user_info", function(err, row) {
		      console.log(row.id + ": " + row.info);
		  });
		});

		db.close();

        var a = req.params.tagId;
        var items = [req.params.tag1,req.params.tag2];
        var json = req.query.json;
        if(json != 'true'){
            res.render('else',{id: a});
        }else{
                var obj = new Object();
                obj.APIkey = a;
                obj.input = b;
                obj.command = c;
                res.json(obj);
        }
});

app.get('/:tagId/:tag1', function(req, res) {
                //access the main game using ip/apikey?input=value e.g http://13.59.173.76/577469cf19400000/test
        var a = req.params.tagId;
        var b = [req.params.tag1];
        var json = req.query.json;
        if(json != 'true'){
            res.render('else',{id: weaponz.generateWeapon()});
        }else{
            var obj = new Object();
                obj.APIkey = a;
                obj.input = b;
                res.json(obj);
        }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);