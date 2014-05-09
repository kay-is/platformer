Crafty.scene('Play', function () {
	Crafty.background('black');

	Crafty.viewport.scale(Game.scale);

	var i, map = Game.maps[ window.location.hash.substring(1) ] || Game.maps.test2;
	for (i in map) {
		Crafty.e('Block')
			.setPosition(map[i][0], map[i][1])
			.setSprite(map[i][2]);
	}

	Game.player = Crafty.e('Player').setPosition(15, 18);

	Crafty.e('Flame').setPosition(15, 5);
	Crafty.e('Flame').setPosition(16, 5).moveLeft();


	Crafty.e('Bat' ).setPosition( 10, 4 );
	Crafty.e('Bat' ).setPosition( 11, 4 );
	Crafty.e('Bat' ).setPosition( 12, 4 );
	Crafty.e('Bat' ).setPosition( 13, 4 );
	Crafty.e('Bat' ).setPosition( 14, 4 );

	Crafty.e('Demon').setPosition(15, 5);

	Game.initScore();
});