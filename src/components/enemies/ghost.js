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
				if (!this._dead) players[0].obj.kill();
			})
			.bind('EnterFrame', this.moving);

		this.reel('flying', 1000, [
			[28, 7],
			[27, 7],
		]);

		this.reel('dead', 10000, [
			[31, 7]
		]);

		this.animate('flying', -1);
	},

	moving: function () {
		this.moveInDirection(this._speed, this._target);
	},

	kill: function () {
		this._dead = true;
		this.unbind('EnterFrame', this.moving);
		this.animate('dead', -1);
		this.gravity('Platform');
		Game.addPoints(20);
	},

	handleBlockHit: function (block, from) {
		var x, y;

		if (block._x > from.x) x = from.x - 200;
		if (block._x < from.x) x = from.x + 200;

		if (block._y > from.y) y = from.y - 200;
		if (block._y < from.y) y = from.y + 200;

		this._target = {
			x: x,
			y: y
		};

		var i = 15, changeDirection = function () {
			if (--i === 0) {
				this._target = Game.player;
				this.unbind('EnterFrame', changeDirection);
			}
		}.bind(this);

		this.bind('EnterFrame', changeDirection);
	}
});