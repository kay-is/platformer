Crafty.scene('Play', function () {
	Crafty.background('black');

	Crafty.viewport.scale(Game.scale);

	var map = Game.maps.test1;
	for (var i in map) {
		var block = Crafty.e('Block').setPosition(map[i][1] / 32, map[i][2] / 32);
		if (!map[i][3]) block.removePlatform();
	}

	Crafty.e('Enemy1').setPosition(23, 5).moveRight();
	Crafty.e('Enemy1').setPosition(9, 5).moveLeft();

	Crafty.e('Player').setPosition(15, 18);

	Game.initScore();
});