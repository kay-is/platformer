Crafty.c('Enemy1', {
	_xDirection: 1,
	_speed: 2,

	init: function () {
		Crafty.sprite(32, Game.sprites, {
			GfxEnemyFire: [27, 13]
		});

		this.requires('Enemy, Position, Canvas, Gravity, Collision, SpriteAnimation, GfxEnemyFire');

		this._gameHeight = Crafty.DOM.translate(0, Game.height).y;

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
				if( !this._dead ) players[0].obj.kill();
			})
			.bind('EnterFrame', this.moving);

		this.reel('flying', 800, [
			[27, 13],
			[30, 13]
		]);

		this.reel('dead', 10000, [
			[31, 13]
		]);

		this.animate('flying', -1);
	},

	moving: function () {
		if (!this._falling) this.x += this._xDirection * this._speed;
		else this.x += this._xDirection * (this._speed / 2);

		if (this._y > this._gameHeight) this.y = 0;
	},

	kill: function () {
		this._dead = true;
		this.unbind('EnterFrame', this.moving);
		this.animate('dead', -1);
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