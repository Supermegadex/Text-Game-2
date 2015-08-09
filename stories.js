var stories = {
	explore: {
		explore: {
			multiple: true,
			number: 3,
			stories: [
				{
					story: "You walk everywhere you can see for about an hour, finding nothing<br>",
					input: {
						fab: true,
						text: ""
					},
					title: "Exploration"
				},
				{
					story: "You run into an angry wolf!<br>",
					action: "return(false)",
					input: {
						fab: true,
						text: "<button class='" + game.buttonClass + "' onclick='game.fight({event:\"start\", enemy:enemies.wolf.start()})'>Fight!</button>"
					},
					title: "Whoa!"
				},
				{
					story: "You find a massive, beautiful, green forest filled with wildlife, some friendly...<br><br>And others not.",
					action: function () { forestFind(); },
					input: {
						fab: true,
						text: ""
					},
					title: "Forest"
				},
				{
					story: "You find a potion on the ground",
					action: function () { game.itemGet('health potion'); },
					input: {
						fab: true,
						text: ""
					},
					title: "Exploration"
				}
			]
		},
		forest: {
			multiple: true,
			number: 3,
			stories: [
				{
					story: "You walk everywhere you can see for about an hour, finding nothing<br>",
					input: {
						fab: true,
						text: ""
					},
					title: "Forest"
				},
				{
					story: "There's a snake in my boot!",
					input: {
						fab: true,
						text: ""
					},
					title: "Forest"
				},
				{
					story: "You find a potion on the ground",
					action: function () { game.itemGet('health potion'); },
					input: {
						fab: true,
						text: ""
					},
					title: "Forest"
				}
			]
		}
	},
	main: {
		multiple: false,
		story: "You return to camp",
		title: "Camp",
		action: function () { game.main() },
		input: [{
			fab: false,
			text: ""
		}],
		img: "md-backgrounds/JPG/grey.jpg"
	},
	create: {
		name: {
			multiple: false,
			story: "I don&apos;t have a backstory yet, so just go ahead and <b>give your character a name!</b>",
			input: {
				text: "",
				story: "<input class='mdl-textfield__input' onkeyup='player.name=this.value' placeholder='Name' />",
				next: "stories.create.stats"
			}
		},
		stats: {
			story: "Here you will generate your stats",
			multiple: false,
			action: function () { game.tableSet = false; game.stats({ update: 'gen' }); },
			input: {
				next: "stories.main",
				text: "",
				story: ""
			}
		}
	},
	data: {
		login: {
			multiple: false,
			story: "Login to load your character",
			title: "login",
			action: "",
			input: {
				"fab": false,
				"text": "",
				"story": "<br /><form style='width: 40%' action='javascript:game.login(document.getElementById(\"username\").value, document.getElementById(\"password\").value)' id='loginForm'><input type='text' class='mdl-textfield__input' placeholder='Username' id='username' /><br /><br /><input type='password' placeholder='Password' class='mdl-textfield__input' id='password' /><br /><input type='submit' class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent' value='Log in' /></form>"
			}
		},
		create: {
			multiple: false,
			story: "Create a new account",
			title: "Register",
			input: {
				fab: true,
				text: "<button onclick='game.register(document.getElementById(\"username\").value, document.getElementById(\"password\").value, document.getElementById(\"email\").value)'>Register</button>",
				story: "<form accept-charset='utf-8' action='javascript:game.register(document.getElementById(\"username\").value, document.getElementById(\"password\").value, document.getElementById(\"email\").value)'><input type='text' placeholder='username' class='mdl-textfield__input' id='username' /><br /><input type='text' class='mdl-textfield__input' placeholder='email' id='email' /><br /><input type='password' class='mdl-textfield__input' placeholder='password' id='password' /></form>"
			}
		}
	}
};