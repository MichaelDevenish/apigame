// 	JSON.stringify(weapon);
// 	JSON.parse(wpnsjson);
// Should work fine.

var weaponData = {
  "weapons" : [
    {"class": "sword", "name": "knife", "dmg": "1d3", "acc": 65},
    {"class": "sword", "name": "dagger", "dmg": "1d4", "acc": 75},
    {"class": "sword", "name": "rapier", "dmg": "1d6", "acc": 95},
    {"class": "sword", "name": "cutlass", "dmg": "1d6", "acc": 80},
    {"class": "sword", "name": "longsword", "dmg": "1d8+1", "acc": 85},
    {"class": "sword", "name": "greatsword", "dmg": "1d12+1", "acc": 80},

    {"class": "axe", "name": "hatchet", "dmg": "1d4", "acc": 65},
    {"class": "axe", "name": "sickle", "dmg": "1d4+1", "acc": 75},
    {"class": "axe", "name": "war axe", "dmg": "1d8+2", "acc": 80},
    {"class": "axe", "name": "great axe", "dmg": "1d12+2", "acc": 70},

    {"class": "club", "name": "wooden club", "dmg": "1d3", "acc": 50},
    {"class": "club", "name": "wooden spoon", "dmg": "1d1", "acc": 20},
    {"class": "club", "name": "beet", "dmg": "1d2", "acc": 25},

    {"class": "bow", "name": "longbow", "dmg": "1d8", "acc": 90},
    {"class": "bow", "name": "shortbow", "dmg": "1d4+1", "acc": 95},
    {"class": "bow", "name": "war bow", "dmg": "1d8+2", "acc": 80},
    {"class": "bow", "name": "crossbow", "dmg": "1d6+2", "acc": 90}
  ],
  "grades" : [
    {"name" : "rusty ", "mod" : 0},
    {"name" : "old ", "mod" : 1},
    {"name" : "", "mod" : 2},
    {"name" : "fine ", "mod" : 3},
    {"name" : "superior ", "mod" : 4},
    {"name" : "legendary ", "mod" : 5},
  ],
  "enchantments" : [
    {"name" : "slashing", "mod": 1, "att": "dmg"},
    {"name" : "crushing", "mod": 1, "att": "dmg"},
    {"name" : "sneaking", "mod": 10, "att": "acc"},
    {"name" : "mystery", "mod": 5, "att": "acc"},
    {"name" : "conundrums", "mod": 1, "att": "dmg"},
    {"name" : "clumsiness", "mod": -15, "att": "acc"},
    {"name" : "precision", "mod": 15, "att": "acc"},
  ]
}

function Weapon(wpnName, dmgDiceSides, dmgDiceNum, dmgMod, acc) {
	this.wpnName = wpnName;
	this.dmgDiceSides = dmgDiceSides;
	this.dmgDiceNum = dmgDiceNum;
	this.dmgMod = dmgMod;
	this.acc = acc;
}

function generateWeapon() {
	var g = weaponData.grades[Math.floor(Math.random()*weaponData.grades.length)];
	var w = weaponData.weapons[Math.floor(Math.random()*weaponData.weapons.length)];
	var e = weaponData.enchantments[Math.floor(Math.random()*weaponData.enchantments.length)];
	var wname = g.name + w.name + " of " + e.name;
	// Calculate damage stats
	var tempd = w.dmg;
	var tempd = tempd.split(/[d+]/); // Split array
	var dDiceN = tempd[0]; // Add dice
	var dDiceS = tempd[1]; // Ade dice sides
	// Add mod if present:
	var dMod = 0;
	if (2 in tempd) {
		dMod += parseInt(tempd[2]);
	}
	// Extra damage mods:
	dMod += (g.mod); // Add modifier to damage
	// If enchantment is dmg mod, add to damage
	if (e.att == "dmg") {
		dMod += (e.mod);
	}
	// Calculate accuracy
	var a = w.acc;
	a += (g.mod*3); // Grade modifier adds 3% to accuracy for each level.
	// If enchantment is acc mod, add to acc
	if (e.att == "acc") {
		a += (e.mod);
	}
	return new Weapon(wname, dDiceS, dDiceN, dMod, a);
}

function rollDamage(wpn) {
	var damage = 0;
	for (var i = 0; i < wpn.dmgDiceNum; i++) {
		damage += Math.floor((Math.random() * wpn.dmgDiceSides) + 1);
	}
	return damage + wpn.dmgMod;
}

// Test
var wep = generateWeapon();
console.log(wep.wpnName);
console.log("dmg: " + wep.dmgDiceNum + "d" + wep.dmgDiceSides + "+" + wep.dmgMod + ". acc: " + wep.acc + ".");
console.log("Damage roll: " + rollDamage(wep));
