// 	JSON.stringify(weapon);
// 	JSON.parse(wpnsjson);
// Should work fine.

var weaponData = {
  "weapons" : [
    
	// Bad blades
	{"class": "sword", "name": "knife", "dmg": "1d6", "acc": 65},
    {"class": "sword", "name": "dagger", "dmg": "1d6", "acc": 70},
	// Good blades
    {"class": "sword", "name": "rapier", "dmg": "2d6", "acc": 90},
    {"class": "sword", "name": "cutlass", "dmg": "1d10+1", "acc": 80},
    {"class": "sword", "name": "longsword", "dmg": "1d10", "acc": 85},
    {"class": "sword", "name": "greatsword", "dmg": "2d8+1", "acc": 65},
	// Bad axes
    {"class": "axe", "name": "hatchet", "dmg": "1d4+1", "acc": 65},
	// Good axes
    {"class": "axe", "name": "sickle", "dmg": "1d8+1", "acc": 75},
    {"class": "axe", "name": "war axe", "dmg": "1d10+2", "acc": 70},
    // Bad clubs
    {"class": "club", "name": "wooden club", "dmg": "1d4", "acc": 55},
    {"class": "club", "name": "wooden spoon", "dmg": "1d3", "acc": 50},
    // There are no good clubs 
	// Bad misc:
    {"class": "misc", "name": "ladle", "dmg": "1d3", "acc": 60},
    // Staves
    {"class": "staff", "name": "quarterstaff", "dmg": "2d4+1", "acc": 70},
    {"class": "staff", "name": "battle staff", "dmg": "2d4+3", "acc": 70},
	// Bows
    {"class": "bow", "name": "longbow", "dmg": "3d3+2", "acc": 95},
    {"class": "bow", "name": "shortbow", "dmg": "3d3+1", "acc": 90},
    {"class": "bow", "name": "sling", "dmg": "2d3+1", "acc": 80}
  ],
  "rareWeapons" : [
	// Joke rares
	{"class": "club", "name": "beet", "dmg": "1d3", "acc": 45},
	{"class": "misc", "name": "prosthetic leg", "dmg": "1d4", "acc": 43},
    {"class": "misc", "name": "enchanted trombone", "dmg": "1d6", "acc": 60},
	// Actually decent rares
	{"class": "staff", "name": "wizard's staff", "dmg": "2d4+4", "acc": 70},
	{"class": "axe", "name": "great axe", "dmg": "1d20", "acc": 60},
	{"class": "bow", "name": "war bow", "dmg": "3d3+4", "acc": 90},
    {"class": "bow", "name": "crossbow", "dmg": "3d4", "acc": 85},
  ],
  "mythicalWeapons" : [
	{"class": "misc", "name": "salted leech", "dmg": "3d6+1", "acc": 80},
	{"class": "sword", "name": "mr. sword", "dmg": "2d8+3", "acc": 85},
	{"class": "misc", "name": "a glock or something", "dmg": "2d10+2", "acc": 90},
  ],
  "grades" : [
    {"name" : "rusty ", "mod" : 0},
    {"name" : "old ", "mod" : 1},
    {"name" : "", "mod" : 2},
    {"name" : "fine ", "mod" : 3},
    {"name" : "superior ", "mod" : 4},
  	{"name" : "exceptional ", "mod" : 5},
  	{"name" : "masterwork ", "mod" : 6},
    {"name" : "legendary ", "mod" : 7},
  	{"name" : "memeful ", "mod" : 8}
  ],
  "basicEnchantments" : [
    {"name" : "slashing", "mod": 1, "att": "dmg"},
    {"name" : "crushing", "mod": 1, "att": "dmg"},
  	{"name" : "politeness", "mod": -1, "att": "dmg"},
    {"name" : "sneaking", "mod": 10, "att": "acc"},
    {"name" : "mystery", "mod": 5, "att": "acc"},
	{"name" : "glowyness", "mod": 4, "att": "acc"},
  ],
  "fancyEnchantments" : [
    {"name" : "conundrums", "mod": 1, "att": "dmg"},
    {"name" : "clumsiness", "mod": -15, "att": "acc"},
    {"name" : "precision", "mod": 15, "att": "acc"},
  	{"name" : "sharpness", "mod": 2, "att": "dmg"},
  	{"name" : "rending", "mod": 3, "att": "dmg"},
  	{"name" : "uselessness", "mod": -2, "att": "dmg"},
  	{"name" : "tooting", "mod": -2, "att": "acc"},
  	{"name" : "salt", "mod": 0, "att": "dmg"},
  ],
}

function Weapon(wpnName, dmgDiceSides, dmgDiceNum, dmgMod, acc, isSalty) {
	this.wpnName = wpnName;
	this.dmgDiceSides = dmgDiceSides;
	this.dmgDiceNum = dmgDiceNum;
	this.dmgMod = dmgMod;
	this.acc = acc;
	this.isSalty = isSalty;
}

exports.generateWeapon = function (difficulty) {
	var g;
	var w = weaponData.weapons[Math.floor(Math.random()*weaponData.weapons.length)];
	var e;
	switch (difficulty) {
		case 0:
			// Always Rusty, always basic enchantment.
			e = weaponData.basicEnchantments[Math.floor(Math.random()*weaponData.basicEnchantments.length)];
			g = weaponData.grades[0];
			break;
		case 1:
			g = weaponData.grades[Math.floor(Math.random() * 2)]; // 50/50 Rusty or Old
			e = weaponData.basicEnchantments[Math.floor(Math.random()*weaponData.basicEnchantments.length)];
			break;
		case 10:
			break;
	}

	var salt = false;
	// Is salty?
	if (e.name == "salt") {
		salt = true;
	}

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
	return new Weapon(wname, dDiceS, dDiceN, dMod, a, salt);
}

exports.rollDamage = function (wpn) {
	var damage = 0;
	for (var i = 0; i < wpn.dmgDiceNum; i++) {
		damage += Math.floor((Math.random() * wpn.dmgDiceSides) + 1);
	}
	return damage + wpn.dmgMod;
}
