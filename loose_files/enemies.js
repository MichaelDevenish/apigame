// Enemy class
function Enemy(maxHP, damageDice, hitChance, dodgeChance, defence, attackType, enemyName) {
	this.maxHP = maxHP;
	this.currHP = maxHP;
	this.damageDice = damageDice;
	this.hitChance = hitChance;
	this.dodgeChance = dodgeChance;
	this.defence = defence;
	this.attackType = attackType;
	this.enemyName = enemyName;
}

// Creates an enemy of the chosen type and returns it
function createEnemy(type) {
	var ed = enemyData[type];
	return new Enemy(
		Math.floor(Math.random()*(ed.maxHPHigh - ed.maxHPLow + 1) + ed.maxHPLow), // Generate HP randomly between maxHPLow and maxHPHigh
		ed.damageDice,
		ed.hitChance,
		ed.dodgeChance,
		ed.defence,
		ed.attackType,
		type
	);
}

function generateEnemyParty(difficulty) {
	var ep = [];
	switch(difficulty) {
		case 1:
			// Generate either a single slime, two rats, or a single ghost, each of equal chance.
			switch (Math.floor(Math.random()*3)) {
				case 0:
					ep.push(createEnemy("Slime"));
					break;
				case 1:
					ep.push(createEnemy("Rat"));
					ep.push(createEnemy("Rat"));
					break;
				case 2:
					ep.push(createEnemy("Ghost"));
					break;
			}
			break;
		default:
			// Idk, just return a slime?
			ep.push(createEnemy("Slime"));
	}
	return ep;
}


var enemyData = {
	"Slime": {"maxHPLow": 16, "maxHPHigh": 24, "damageDice": '1d4+2', "hitChance": 90, "dodgeChance": 10, "defence": 3, "attackType": "phys"},
	"Rat": {"maxHPLow": 11, "maxHPHigh": 14, "damageDice": '1d4+1', "hitChance": 90, "dodgeChance": 15, "defence": 1, "attackType": "phys"},
	"Ghost": {"maxHPLow": 19, "maxHPHigh": 25, "damageDice": '1d4+2', "hitChance": 90, "dodgeChance": 10, "defence": 3, "attackType": "phys"},
}




// Testing

var enemyParty = generateEnemyParty(1);
console.log("The enemy party contains:");
for (var i = 0; i < enemyParty.length; i++) {
	e = enemyParty[i];
	console.log(e.enemyName + ", HP: " + e.currHP + "/" + e.maxHP + ", Hit: " + e.hitChance + ", Dodge: " + e.dodgeChance + ", Defence: " + e.defence + ", Attack Type: " + e.attackType)
}