function forestFind() {
	player.places.forest = true;
}

var game = {
	itemGet: function(item) {
		console.log(item);
	},
	forest: function () {
		var f = document.createElement("button");
		f.innerText = "Forest";
		f.onclick = function () {
			updateStory("stories.explore.forest");
		};
		f.className = "mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored mdl-button--raised mdl-color--green";
		return (f);
	},
	cave: function () {
		var f = document.createElement("button");
		f.innerText = "Cave";
		f.onclick = function () {
			updateStory("stories.explore.cave");
		};
		f.className = "mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored mdl-button--raised mdl-color--grey";
		return (f);
	},
	main: function () {
		var ip = document.createElement("span");
		ip.innerHTML = "<button onclick='updateStory(\"stories.explore.explore\")' class='mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored mdl-button--raised'>Explore!</button>";
		var cave = document.createElement("button");
		if (player.places.forest) {
			ip.appendChild(document.createTextNode("   "));
			ip.appendChild(this.forest());
		}
		if (player.places.cave) {
			ip.appendChild(document.createTextNode("   "));
			ip.appendChild(this.cave());
		}
		ip1.appendChild(ip);
	},
	save: function () {
		localStorage.delpinoGame = JSON.stringify(player);
	},
	load: function () {
		var stored = JSON.parse(localStorage.delpinoGame);
		for (var attrname in stored) { player[attrname] = stored[attrname]; };
		updateStory("stories.main");
	},
	new: function () {
		player = playerProto;
		
	}
};

var player = {
	name: "Player",
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
    hp: 100,
    maxHp: 100,
    xp: 0,
    nextLevel: 20,
    mana: 100,
    maxMana: 100,
    level: 0,
    places: {
        forest: false,
        cave: false
    },
    campSize: "small"
};

var playerProto;