Crafty.scene('Play', function () {
	Crafty.background('black');

	Crafty.viewport.scale(Game.scale);

	var i, map = Game.maps.test1;
	for (i in map) {
		Crafty.e('Block')
			.setPosition(map[i][0], map[i][1])
			.setSprite(map[i][2]);
	}

	Game.player = Crafty.e('Player').setPosition(15, 18);

	var i;

	for (i = 2; i < 34; i += 4) {
		Crafty.e('Enemy2').setPosition(i, 4);
	}

	Crafty.e('Enemy1').setPosition(1, 11);
	Crafty.e('Enemy1').setPosition(30, 11).moveLeft();

	Crafty.e('Enemy1').setPosition(16, 11);
	Crafty.e('Enemy1').setPosition(15, 11).moveLeft();

	Game.initScore();
});