Crafty.c('Ghost', {
	_speed: 1,
	_target: null,

	init: function () {
		Crafty.sprite(32, Game.sprites, {
			GfxEnemyGhost: [27, 7]
		});

		this.requires('Enemy, Position, Canvas, Gravity, DirectedMotion, Collision, SpriteAnimation, GfxEnemyGhost');

		this._gameHeight = Crafty.DOM.translate(0, Game.height).y;

		this._target = Game.player;

		this.attr({ w: Game.gridSize, h: Game.gridSize })
			.onHit('Player', function (players) {
				this.unbind('EnterFrame', this.moving);
			})
			.bind('EnterFrame', this.moving);

		this.reel('flying', 1000, [
			[28, 7],
			[27, 7]
		]);

		this.animate('flying', -1);
	},

	moving: function () {
		this.moveInDirection(this._speed, this._target);
	},

	kill: function () {
		this.destroy();
		Game.addPoints(20);
	}
});