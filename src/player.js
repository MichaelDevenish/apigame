function Player() {
	this.level = 1;
	this.xp = 0;
	this.str = 0;
	this.dex = 0;
	this.agi = 0;
	this.def = 0;
	this.mdef = 0;
	
	this.eWeapon = eWeapon;
	this.eArmour = eArmour;
	function levelUpPlayer() {
		//
	}
}

function createPlayer() {
	// Randomly generate a weapon and armour.
}

// Function for total xp to reach tl
function xpForLevel(tl) {
	return tl * (tl+1) * (tl+2) / 6;
}

// Test
for (var i = 2; i < 10; i++) {
	console.log("Xp to level " + i + ": " + xpForLevel(i))
} 
var p = new Player();
console.log(JSON.stringify(p));