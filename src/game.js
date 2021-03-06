var player = require("./player.js");
var rooms = require("./rooms.js");
var sqlite3 = require('sqlite3').verbose();


// Game logic functions:

/*
 * Used when the player changes room. Should be called at the start at 0,0 and from movePlayer with the new coords.
 * This function should check if the room exists, and if it does load that room to the player object.
 * If the room doesnt exist, generate a new room, store it, and save the current room in player object.
 */
exports.enterRoom = function(x, y) {

}

exports.beginGame = function(apiid) {
// <<<<<<< HEAD
// 	// Create the player
// 	var plyr = player.createPlayer();
// 	// Create the map
// 	var map = [];
// 	// Create first room
// 	map.push(rooms.generateRoom(0,0));
// 	plyr.currRoom = map[0];
// 	var enemies = [];
//
// 	var db = new sqlite3.Database('databeets_of_politeness.db');
// 		db.serialize(function() {
//
// 		  db.run("CREATE TABLE if not exists user_info (key TEXT, map TEXT, player TEXT, enemies TEXT)");
// 		  var stmt = db.prepare("INSERT INTO user_info VALUES (?,?,?,?)");
// 		      stmt.run(apiid,JSON.stringify(map),JSON.stringify(plyr),JSON.stringify(enemies));
// 		  stmt.finalize();
// 		});
//
// 		db.close();
// =======
        // Create the player
        var plyr = player.createPlayer();
        // Create the map
        var map = [];
        // Create first room
        map.push(rooms.generateRoom(0,0));
        plyr.currRoom = map[0];
        var enemies = [];
        var db = new sqlite3.Database('mydb.db');
        db.serialize(function(){
        db.run("CREATE TABLE if not exists user_info (key TEXT, map TEXT, player TEXT, enemies TEXT)");
         var stmt = db.prepare("INSERT INTO user_info VALUES (?,?,?,?)");
                      stmt.run(apiid,JSON.stringify(map),JSON.stringify(plyr),JSON.stringify(enemies));
        console.log(apiid + ':' + apiid,JSON.stringify(map) + JSON.stringify(plyr) + JSON.stringify(enemies));
        stmt.finalize();
        });
        db.close();
// >>>>>>> 36a34877c8d7e8512d6b8f0e29c926cff73a6e4c
}


/*
 * Updates the players location to a new room, then calls enter room.
 */
exports.movePlayer = function(x, y) {

}




// API Call Functions:
// API Calls should call one of these functions which will just

exports.apiRoom = function(apiId,callback) {
// rec api key
//get all for that key
// get room
// reutrn room desc, json of player

  var db = new sqlite3.Database('mydb.db');
  console.log('test');

  db.serialize(function() {
     var stmt = db.prepare("SELECT key, map, player, enemies FROM user_info where key = ?", function(err, row) {
           callback(row.key + ':' + row.map + ':' + row.player + ':' + row.enemies);
           db.close();
     });
     stmt.run(key);
  });

}
exports.apiAttack = function(apiId,enemyId,callback) {
}

exports.apiHelp = function(userID, callback) {

}

exports.apiEquip = function(userID, itemId,callback) {
}


exports.apiGo = function(apiId,direction,callback) {

}

exports.apiKillMe = function(apiId,callback) {

}


exports.apiEchoDatabase = function(callback) {
        var db = new sqlite3.Database('mydb.db');
        console.log('test');
        db.serialize(function() {
	  db.each("SELECT key, map, player, enemies FROM user_info ASC LIMIT 1", function(err, row) {
                 callback(row.key + ':' + row.map + ':' + row.player + ':' + row.enemies);
           });
	   db.close();
        });
        //data+= "asfg";
        }
