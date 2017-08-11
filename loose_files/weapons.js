
d = {
  "weapons" : [
    {"class": "sword", "name": "knife", "dmg": "1d3", "acc": 3},
    {"class": "sword", "name": "dagger", "dmg": "1d4", "acc": 5},
    {"class": "sword", "name": "rapier", "dmg": "1d6", "acc": 9},
    {"class": "sword", "name": "cutlass", "dmg": "1d6", "acc": 6},
    {"class": "sword", "name": "longsword", "dmg": "1d8+1", "acc": 7},
    {"class": "sword", "name": "greatsword", "dmg": "1d12+1", "acc": 6},

    {"class": "axe", "name": "hatchet", "dmg": "1d4", "acc": 3},
    {"class": "axe", "name": "sickle", "dmg": "1d4+1", "acc": 5},
    {"class": "axe", "name": "war axe", "dmg": "1d8+2", "acc": 6},
    {"class": "axe", "name": "great axe", "dmg": "1d12+2", "acc": 4}
  ],
  "grades" : [
    {"name" : "rusty ", "mod" : -2},
    {"name" : "old ", "mod" : -1},
    {"name" : "", "mod" : 0},
    {"name" : "fine ", "mod" : 1},
    {"name" : "superior ", "mod" : 2},
    {"name" : "legendary ", "mod" : 3},
  ],
  "enchantments" : [
    {"name" : "slashing", "mod": 1, "att": "dmg"},
    {"name" : "crushing", "mod": 1, "att": "dmg"},
    {"name" : "sneaking", "mod": 1, "att": "acc"},
    {"name" : "mystery", "mod": 1, "att": "acc"},
    {"name" : "conundrums", "mod": 1, "att": "dmg"},
  ]
}

//Randomly generate a weapon
g = d.grades[Math.floor(Math.random()*d.grades.length)];
w = d.weapons[Math.floor(Math.random()*d.weapons.length)];
e = d.enchantments[Math.floor(Math.random()*d.enchantments.length)];


//Store  the dmg string in temp var
tdmg = w.dmg;

//split temp var into array
dmg = tdmg.split(/[d+]/);
//0 = # of dice, 1 = side, 2 if exists = mod

//reset temp var to 0 for upcming use to store final roll damage
tdmg = 0;
i = 0;
//roll the dice and add up the score
while (i<dmg[0]) {
  tdmg += Math.floor(Math.random()* (dmg[1] - 1)+1);
  i++;
}

//if there is a mod value on the weapon, add it
if (2 in dmg) {
  tdmg += parseInt(dmg[2]);
}

//TODO: INCLUDE OTHER DMG MODS HERE

console.log(g.name + w.name + " of " + e.name);
console.log("Damage: " +tdmg);
