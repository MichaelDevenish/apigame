var weaponz = require('./weaponz.js');
var rooms = require('./rooms.js');

function Player(wep) {
	this.level = 1;
	this.xp = 0;
	this.str = 0;
	this.dex = 0;
	this.agi = 0;
	this.def = 0;
	this.mdef = 0;
	this.roomsEntered = 1;
	this.eWeapon = wep;
	function levelUpPlayer() {

	}
}

exports.createPlayer = function () {
	// Randomly generate a weapon and armour.
	var wp = weaponz.generateWeapon(0);
	return new Player(wp);
}

// Function for total xp to reach tl
exports.xpForLevel = function (tl) {
	return tl * (tl+1) * (tl+2) / 6;
}

exports.calcDifficulty = function (x, y, n) {
	if (x < 0) x = -x;
	if (y < 0) y = -y;
	var t = Math.floor(x + y + (n/2));
	t = (Math.round(t/5));
	if (t < 1) t = 1;
	if (t > 10) t = 10;
	return t;
}

// Test
var pl = exports.createPlayer();
console.log(JSON.stringify(pl));

// console.log(rooms.describeRoom(rooms.generateRoom(0,0)));
