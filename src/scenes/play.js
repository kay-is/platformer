Crafty.scene('Play', function () {
	Crafty.background('black');

	Crafty.viewport.scale(Game.scale);

	var i, map = Game.maps.test1;
	for (i in map) {
		Crafty.e('Block')
			.setPosition(map[i][0], map[i][1])
			.setSprite(map[i][2]);
	}

	Crafty.e('Enemy1').setPosition(23, 5).moveRight();
	Crafty.e('Enemy1').setPosition(9, 5).moveLeft();

	Crafty.e('Player').setPosition(15, 18);

	Game.initScore();
});