var weaponz = require('./weaponz.js');
var rooms = require('./rooms.js');

function Player(wep) {
	this.maxHP = 25;
	this.currHP = 25;
	this.level = 1;
	this.xp = 0;
	this.str = 0;
	this.dex = 0;
	this.agi = 0;
	this.def = 0;
	this.mdef = 0;
	this.roomsEntered = 1;
	this.eWeapon = wep;
	this.enemies = [];
	this.currX = 0;
	this.currY = 0;
	this.currRoom = null;
	this.levelUpPlayer = function () {
		// Randomly increases Str, Dex or Agi, and increases HP by a small amount.
		var r = Math.floor(Math.random()*3);
		for (var i = 0; i < 2; i++) {
			switch (r) {
			case 0:
				this.str++;
				break;
			case 1:
				this.dex++;
				break;
			case 2:
				this.agi++;
				break;
			}
		}
		var inchp = Math.floor(Math.random()*4)+3;
		this.maxHP += inchp;
		this.level++;
	}
	this.checkLevel = function () { // Fuckin recursion mate
		if (exports.xpForLevel(this.level+1) <= this.xp) {
			this.levelUpPlayer();
			this.checkLevel();
		}
	}
	this.gainExp = function (amount) {
		this.xp += amount;
		this.checkLevel();
	}
}

exports.createPlayer = function () {
	// Randomly generate a weapon and armour.
	var wp = weaponz.generateWeapon(0);
	var p = new Player(wp);
	for (var i = 0; i < 3; i++) {
		var r = Math.floor(Math.random()*3);
		switch (r) {
			case 0:
				p.str++;
				break;
			case 1:
				p.dex++;
				break;
			case 2:
				p.agi++;
				break;
		}
	}
	return p;
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
console.log(rooms.describeRoom(rooms.generateRoom(0,0)));
console.log("\ndiff 1 weapon: " + JSON.stringify(weaponz.generateWeapon(1)));
console.log("\n diff 4 weapon: " + JSON.stringify(weaponz.generateWeapon(4)));
console.log("\ndiff 9 weapon: " + JSON.stringify(weaponz.generateWeapon(9)));
