Game.Enemy1 = Crafty.c('Enemy1', {
	_xDirection: 1,
	_speed: 2,

	init: function () {
		Crafty.sprite(32, Game.sprites, {
			GfxEnemyFire: [27, 13]
		});

		this.requires('Enemy' +
			'' +
			', Position, Canvas, Gravity, Collision, SpriteAnimation, GfxEnemyFire');

		var gameHeight = Crafty.DOM.translate(0, Game.height).y;

		this.attr({ w: Game.gridSize, h: Game.gridSize })
			.gravity('Platform')
			.onHit('Block', function (blocks) {
				var blockX = blocks[0].obj._x;
				if (blockX > this._x) {
					this._xDirection = -1;
					this.flip();
				}
				else if (blockX < this._x) {
					this._xDirection = 1;
					this.unflip();
				}
			})
			.onHit('Player', function (players) {
				players[0].obj.kill();
			})
			.bind('EnterFrame', function () {
				if (!this._falling) this.x += this._xDirection * this._speed;
				else this.x += this._xDirection * (this._speed / 2);

				if (this._y > gameHeight) this.y = 0;
			});

		this.reel('flame', 800, [
			[27, 13],
			[30, 13]
		]);

		this.animate('flame', -1);
	},

	kill: function () {
		this.destroy();
		Game.addPoints(10);
	},

	moveLeft: function () {
		this._xDirection = -1;
		this.flip();
		return this;
	},

	moveRight: function () {
		this._xDirection = 1;
		return this;
	}
});