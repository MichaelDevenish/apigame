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
	this.levelUpPlayer = function () {
		// Randomly increases Str, Dex or Agi, and increases HP by a small amount.
		var r = Math.floor(Math.random()*3);
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
		var inchp = Math.floor(Math.random()*3)+3;
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

<<<<<<< HEAD
// console.log(rooms.describeRoom(rooms.generateRoom(0,0)));
=======
console.log(JSON.stringify(pl));
pl.gainExp(4);
console.log(JSON.stringify(pl));
pl.gainExp(2);
console.log(JSON.stringify(pl));
pl.gainExp(22);
console.log(JSON.stringify(pl));
>>>>>>> 7890fb7f4fa73e8e83e3bbe040fa36972dd871d2
