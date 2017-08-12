/*
 *	This file allows the generation of rooms and allows saving rooms as objects
 *	Room objects are kept small to allow easy storage, and are converted to text in code
 *	A room object should probably be stored as a "Stringified" form?
 * 	JSON.stringify(room);
 * 	JSON.parse(roomjson);
 */
 
function Room (overview, minorFeature, minorFeature2, sensory, roomX, roomY) {
	this.overview = overview;
	this.minorFeature = minorFeature;
	this.minorFeature2 = minorFeature2;
	this.sensory = sensory;
	this.roomX = roomx;
	this.roomY = roomY;
	this.dir = "NSEW";
}

var roomData = {
	"overview" : [
		"wide", "armory", "torture", "marble", "dark"
	],
	"minorFeature" : [
		"glow", "drip", "slime", "rock"
	],
	"sensory" : [
		"cold", "dank", "water", "shriek", "hot", "echo", "eerie", "ominous"
	]
}

exports.describeRoom = function (room) {
	var description = describeOverview(room.overview);
	description += describeMinorFeature(room.minorFeature);
	description += describeMinorFeature(room.minorFeature2);
	description += describeSensory(room.sensory);
	return description;
}

function describeOverview(o) {
	switch(o) {
		case "wide":
			return 	"The room is wide and open, the floor and walls are made of smooth grey rock. The roof towers far above you with rocky stalactites hanging down.";
		case "armory":
			return 	"This room looks like an abandonded armoury, there are empty weapon racks along the walls" +
					", rusted scrap metal that was probably once swords is scattered around the floor. A thick collection of dust is settled on almost everything.";
		case "torture":
			return	"In the center of the room sits a menacing looking torture rack. The walls are lined with jail cells, " +
					"some dusty skeletons still lying inside.";
		case "marble":
			return 	"The floor of this room is made of well-polished marble. Beautiful paintings line the walls and a huge wooden dining table sits in the center. " +
					"Everything looks surprisngly well kept, as if someone or something uses this room often.";
		case "dark":
			return	"Everything is dim and its hard to see, but you can just make out what seems to be a human corpse sitting in the corner. You hear small bones crunching underneath your feet.";
		default:
			return "";
	}
}


/*
 * Sensory and minor feature descriptions should start with a space.
 */

function describeMinorFeature(f) {
	switch(f) {
		case "glow":
			return " The walls of the room are giving off a faint glow. You find it comforting for some reason.";
		case "drip":
			return " A strange liquid is dripping from the roof. You cannot identify the liquid.";
		case "slime":
			return " The surfaces of this room are covered in a fine layer of slime. It is sticky to the touch.";
		case "rock":
			return " The walls of the room appear to be made of a rough stone, of a type you cannot identify.";
		case "rats":
			return "Tiny rats scurry away from you.";
		case "blood":
			return "There is a faint trail of blood accross the floor."
		default:
			return "";
	}
}

function describeSensory(s) {
	switch(s) {
		case "cold":
			return " The air feels just a little bit chilly.";
		case "dank":
			return " Everything is unpleasantly damp and cold, and your skin starts to feel clammy.";
		case "water":
			return " There is a sound of rushing water far above you.";
		case "shriek":
			return " You hear an incredibly high pitched shrieking noise, but can't quite locate where it came from";
		case "hot":
			return " The room is uncomfortably hot, and you start to sweat";
		case "echo":
			return " The room seems to echo more than a room of this size should. You feel uneasy";
		case "eerie":
			return " The room gives you a an eerie sense of impending doom. You cannot be certain why, but you don't want to stay in this room longer than you must.";
		case "ominous":
			return " This room feels wrong and unnatural.";
		default:
			return "";
	}
}

exports.generateRoom = function (roomX, roomY) {
	// Random overview
	var ov = roomData.overview[Math.floor(Math.random()*roomData.overview.length)];
	var sen = null;
	// Random sensory. 50% of no sensory at all
	if (Math.floor(Math.random()*2) == 0) {
		sen = roomData.sensory[Math.floor(Math.random()*roomData.sensory.length)];
	}
	// Random minor feature
	var mf1 = roomData.minorFeature[Math.floor(Math.random()*roomData.minorFeature.length)];
	var mf2 = null;
	// Chance of a second minor feature (Like, 33%?)
	if (Math.floor(Math.random()*3) == 0) {
		mf2 = roomData.minorFeature[Math.floor(Math.random()*roomData.minorFeature.length)];
		// If its the same as first minor feature just remove it:
		if (mf2 == mf1) mf2 = null;
	}
	return new Room(ov, mf1, mf2, sen, roomX, roomY);
}