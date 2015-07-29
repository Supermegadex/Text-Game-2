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
		ip1.innerHTML = "";
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
	create: function () {
		player = playerProto;
		updateStory("stories.start");
	},
	sSave: function () {
		$.ajax({
			method: "POST",
			url: "edit.php",
			data: { data: JSON.stringify(player) }
		}).success(function (msg) {
			alert("Data Saved for character " + msg);
		});
	},
	sLoad: function () {
		$.ajax({
			method: "POST",
			url: "load.php",
		}).success(function (msg) {
			msg = JSON.parse(msg);
			player = msg;
			updateStory("stories.main");
		});
	},
	login: function (username, password) {
		$.ajax({
			method: "POST",
			url: "login.php",
			data: {data:JSON.stringify(player), username:username, password:password}
		}).success(function (msg) {
			alert(msg);
			game.sLoad();
		});
	},
	register: function (username, password, email) {
		$.ajax({
			method: "POST",
			url: "register.php",
			data: {data:JSON.stringify(player), username:username, password:password, email:email}
		}).success(function (msg) {
			alert(msg);
		});
	},
	logout: function () {
		$.ajax({
			method: "POST",
			url: "logout.php",
		}).success(function (msg) {
			alert(msg);
			player = playerProto;
			updateStory("stories.create.name");
		});
	},
	tableSet: false,
	currentPlace: "",
	stats: function (dat) {
		if (!game.tableSet) {
			game.tableSet = true;
			window.setTimeout(function () {
				document.querySelector("#storyIp").appendChild(document.querySelector("#stats-choose > div"));
			}, 100);
		}
		if (dat.update == "stat+") {
			if (player.points > 0) {
				player[dat.value]++;
				player.points--;
				player.pointCounter[dat.value]++;
			}
		}
		if (dat.update == "stat-") {
			if (player.pointCounter[dat.value] > 0) {
				player[dat.value]--;
				player.pointCounter[dat.value]--;
				player.points++;
			}
		}
		if (dat.update == "gen") {
			player.points = 10;
			function randomize(array, total){
			    var maxLoops = 100, randomized;
			    do{
			        randomized = array.map(function(value){
			           return Math.floor(Math.random()*(value+1)); 
			        });
			        maxLoops--;
			    }while(randomized !== 0 && maxLoops > 0 && randomized.reduce(function(a, b){ return a+b; }) !== total);
			
			    return randomized;
			}
			var genItems = randomize([15, 15, 15, 15, 15, 15], 60);
			var statistics = ["str", "dex", "con", "int", "wis", "cha"];
			for (var i = 0; i < 6; i++) {
				player[statistics[i]] = genItems[i];
			}
		}
		update();
	},
	Ooud: false,
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
    campSize: "small",
	points: 10,
	pointCounter: {
		str: 0,
		int: 0,
		cha: 0,
		wis: 0,
		con: 0,
		dex: 0
	},
};

var playerProto;