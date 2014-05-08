Crafty.scene('Play', function () {
	Crafty.background('black');

	Crafty.viewport.scale(Game.scale);

	var i, map = Game.maps[ window.location.hash.substring(1) ] || Game.maps.test1;
	for (i in map) {
		Crafty.e('Block')
			.setPosition(map[i][0], map[i][1])
			.setSprite(map[i][2]);
	}

	Game.player = Crafty.e('Player').setPosition(15, 18);

	Crafty.e('Ghost').setPosition(15, 3);

	Game.initScore();
});