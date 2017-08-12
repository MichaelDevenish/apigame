function Player() {
	this.level = 1;
	this.xp = 0;
	this.str = 0;
	this.dex = 0;
	this.agi = 0;
	this.def = 0;
	this.mdef = 0;
	this.roomsEntered = 1;
	// Generate a weapon and an armour
	
	function levelUpPlayer() {
		//
	}
}

exports.createPlayer = function () {
	// Randomly generate a weapon and armour.
}

// Function for total xp to reach tl
exports.xpForLevel function (tl) {
	return tl * (tl+1) * (tl+2) / 6;
}

exports.calcDifficulty function (x, y, n) {
	if (x < 0) x = -x;
	if (y < 0) y = -y;
	var t = Math.floor(x + y + (n/2));
	t = (Math.round(t/5));
	if (t < 1) t = 1;
	if (t > 10) t = 10;
	return t;
}

// Test
for (var i = 2; i < 10; i++) {
	console.log("Xp to level " + i + ": " + xpForLevel(i))
} 
var p = new Player();
console.log(JSON.stringify(p));
console.log("Calculate difficulty for 0,0 (room 1): " + calcDifficulty(0,0,1));
console.log("Calculate difficulty for 2,2 (Room 5): " + calcDifficulty(2,2,5));
console.log("Calculate difficulty for 4,3 (Room 8): " + calcDifficulty(4,3,8));
console.log("Calculate difficulty for 7,10 (Room 21): " + calcDifficulty(7,10,21));