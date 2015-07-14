function forestFind() {
	game.forest = true;
}

var game = {
	forest: false,
	cave: false,
	itemGet: function(item) {
		console.log(item);
	}
};