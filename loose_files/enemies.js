/*
 *	This file describes enemies, and allows the generation of enemy parties based on difficulty.
 *	Spice
 */

// Enemy class
function Enemy(maxHP, damageDice, hitChance, dodgeChance, defence, attackType, enemyTitle, enemyName) {
	this.maxHP = maxHP;
	this.currHP = maxHP;
	this.damageDice = damageDice;
	this.hitChance = hitChance;
	this.dodgeChance = dodgeChance;
	this.defence = defence;
	this.attackType = attackType;
	this.enemyTitle = enemyTitle;
	this.enemyName = enemyName;
}

// Creates an enemy of the chosen type and returns it
function createEnemy(type, name) {
	var ed = enemyData[type];
	return new Enemy(
		Math.floor(Math.random()*(ed.maxHPHigh - ed.maxHPLow + 1) + ed.maxHPLow), // Generate HP randomly between maxHPLow and maxHPHigh
		ed.damageDice,
		ed.hitChance,
		ed.dodgeChance,
		ed.defence,
		ed.attackType,
		ed.name,
		name
	);
}

function generateEnemyParty(difficulty) {
	var ep = [];
	var usableNames = enemyNames.slice();
	shuffleArray(usableNames); // Shuffle the array to get random names
	switch(difficulty) {
		case 1:
			// Generate either a single slime, two rats, or a single ghost, each of equal chance.
			switch (Math.floor(Math.random()*3)) {
				case 0:
					ep.push(createEnemy("goo", usableNames.pop()));
					break;
				case 1:
					ep.push(createEnemy("rat", usableNames.pop()));
					ep.push(createEnemy("rat", usableNames.pop()));
					break;
				case 2:
					ep.push(createEnemy("ghost", usableNames.pop()));
					break;
			}
			break;
		default:
			// Idk, just return a slime?
			ep.push(createEnemy("Slime"));
	}
	return ep;
}

function shuffleArray(a) {
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    return a;
}


var enemyData = {
	"goo": {"name": "Puddle of Goo", "maxHPLow": 16, "maxHPHigh": 24, "damageDice": '1d4+2', "hitChance": 90, "dodgeChance": 10, "defence": 3, "attackType": "phys"},
	"rat": {"name": "Giant Rat", "maxHPLow": 11, "maxHPHigh": 14, "damageDice": '1d4+1', "hitChance": 90, "dodgeChance": 15, "defence": 1, "attackType": "phys"},
	"ghost": {"name": "Spoopy Ghost", "maxHPLow": 19, "maxHPHigh": 25, "damageDice": '1d4+2', "hitChance": 90, "dodgeChance": 10, "defence": 3, "attackType": "magi"},
	"knight": {"name": "Lost Knight", "maxHPLow": 19, "maxHPHigh": 25, "damageDice": '1d4+2', "hitChance": 90, "dodgeChance": 10, "defence": 3, "attackType": "phys"},
}

var enemyNames = [
	'James', 'John', 'Rob', 'Mike', 'Will', 'Davo', 'Charlie', 'Joseph', 'Joe', 'Paul', 'Dan', 'Mark', 'Donald', 'Eddy', 'Ron', 'Brian', 'Tony', 'Matt', 'Gazza', 'Timo', 'Steve'
	'Eric', 'Ray', 'Andy', 'Pat', 'Juan', 'Jack', 'Frank', 'Scotty',
	'Mary', 'Linda', 'Barb', 'Liza', 'Jen', 'Maria', 'Susy', 'Lisa', 'Karen', 'Betty', 'Carol', 'Sandra', 'Anna', 'Amy', 'Rebecca', 'Jess', 'Debra', 'Joyce', 'Diane', 'Alice'
]


// Testing

var enemyParty = generateEnemyParty(1);
console.log("The enemy party contains:");
for (var i = 0; i < enemyParty.length; i++) {
	e = enemyParty[i];
	console.log(e.enemyName + " the " + e.enemyTitle + ", HP: " + e.currHP + "/" + e.maxHP + ", Hit: " + e.hitChance + ", Dodge: " + e.dodgeChance + ", Defence: " + e.defence + ", Attack Type: " + e.attackType)
}
