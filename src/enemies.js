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
		case 2:
			// Generate some enemies, with a chance of a knight, dog, or cat.
			switch (Math.floor(Math.random()*5)) {
				case 0:
					ep.push(createEnemy("goo", usableNames.pop()));
					if (Math.floor(Math.random()*3) == 0) {
						ep.push(createEnemy("rat", usableNames.pop()));
					}
					break;
				case 1:
					ep.push(createEnemy("ghost", usableNames.pop()));
					if (Math.floor(Math.random()*3) == 0) {
						ep.push(createEnemy("rat", usableNames.pop()));
					}
					break;
				case 2:
					ep.push(createEnemy("cat", usableNames.pop()));
					if (Math.floor(Math.random()*4) == 0) {
						ep.push(createEnemy("cat", usableNames.pop()));
					}
					break;
				case 3:
					ep.push(createEnemy("knight", usableNames.pop()));
					break;
				case 4:
					ep.push(createEnemy("dog", usableNames.pop()));
					break;
			}
		case 3:
			// Generate some enemies, often Knights or Squirrels.
			switch (Math.floor(Math.random()*5)) {
				case 0:
					ep.push(createEnemy("knight", usableNames.pop()));
					if (Math.floor(Math.random()*2) == 0) {
						ep.push(createEnemy("goo", usableNames.pop()));
					}
					break;
				case 1:
					ep.push(createEnemy("ghost", usableNames.pop()));
					if (Math.floor(Math.random()*2) == 0) {
						ep.push(createEnemy("ghost", usableNames.pop()));
					}
					break;
				case 2:
					ep.push(createEnemy("squirrel", usableNames.pop()));
					if (Math.floor(Math.random()*2) == 0) {
						ep.push(createEnemy("squirrel", usableNames.pop()));
					}
					break;
				case 3:
					ep.push(createEnemy("snake", usableNames.pop()));
					ep.push(createEnemy("snake", usableNames.pop()));
					break;
				case 4:
					ep.push(createEnemy("axemurder", usableNames.pop()));
					break;
			}
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
	"goo": {"name": "Puddle of Goo", "maxHPLow": 14, "maxHPHigh": 18, "damageDice": '1d4+2', "hitChance": 85, "dodgeChance": 10, "defence": 2, "attackType": "phys"},
	"rat": {"name": "Giant Rat", "maxHPLow": 7, "maxHPHigh": 11, "damageDice": '1d4+1', "hitChance": 85, "dodgeChance": 15, "defence": 1, "attackType": "phys"},
	"ghost": {"name": "Spoopy Ghost", "maxHPLow": 15, "maxHPHigh": 21, "damageDice": '1d6', "hitChance": 85, "dodgeChance": 10, "defence": 1, "attackType": "magi"},
	
	"knight": {"name": "Lost Knight", "maxHPLow": 23, "maxHPHigh": 28, "damageDice": '1d8+1', "hitChance": 80, "dodgeChance": 10, "defence": 3, "attackType": "phys"},
	"dog":{"name": "Dog", "maxHPLow": 17, "maxHPHigh": 22 "damageDice": '1d6+1', "hitChance": 95, "dodgeChance": 12, "defence": 2, "attackType": "phys"},
	"cat":{"name": "Wizarding Cat", "maxHPLow": 15, "maxHPHigh": 21 "damageDice": '2d4', "hitChance": 90, "dodgeChance": 12, "defence": 2, "attackType": "phys"},

	"squirrel":{"name": "Rabid Squirrel", "maxHPLow": 14, "maxHPHigh": 19 "damageDice": '1d8', "hitChance": 95, "dodgeChance": 14, "defence": 2, "attackType": "phys"}
	"snake":{"name": "Snek", "maxHPLow": 15, "maxHPHigh": 20 "damageDice": '1d10', "hitChance": 92, "dodgeChance": 20, "defence": 2, "attackType": "phys"}
	"axemurder":{"name": "Axe Murderer", "maxHPLow": 24, "maxHPHigh": 29 "damageDice": '1d10+2', "hitChance": 80, "dodgeChance": 13, "defence": 2, "attackType": "phys"}

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
	console.log(JSON.stringify(enemyParty[i]));
}