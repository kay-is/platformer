Crafty.c('DemonFire', {
	_speed: 10,
	_xDirection: 1,

	init: function () {
		Crafty.sprite(32, Game.sprites, {
			GfxDemonFlame: [0, 52]
		});

		this.requires('2D, Canvas, Collision, SpriteAnimation, GfxDemonFlame');

		this.reel('fly', 250, [
				[1, 52],
				[2, 52]
			])
			.reel('hit', 100, [
				[3, 52]
			]);

		this.onHit('Block', function () {
				this.animate('hit', 1);
				this._speed = 0;
				setTimeout(function () {
				this.destroy();
				}.bind(this), 50);
			})
			.onHit('Player', function(players){
				players[0].obj.kill();
			});
		this.bind('EnterFrame', function () {
			this.x += this._speed * this._xDirection;
		});
		this.animate('fly', -1);
	},

	moveLeft: function () {
		this._xDirection = -1;
		this.flip();
	},

	moveRight: function () {
		this._xDirection = 1;
		this.unflip();
	}
});

Crafty.c('Demon', {
	_xDirection: 1,
	_speed: 3,

	init: function () {
		Crafty.sprite(32, Game.sprites, {
			GfxEnemyDemon: [27, 4]
		});

		this.requires('Enemy, Position, Canvas, Gravity, Collision, SpriteAnimation, GfxEnemyDemon');

		this._gameHeight = Crafty.DOM.translate(0, Game.height).y;

		falling = false;
		this.attr({ w: Game.gridSize, h: Game.gridSize })
			.gravity('Platform')
			.onHit('Block', function (blocks) {
				var blockX = blocks[0].obj._x;
				if (blockX > this._x) this.moveLeft();
				else if (blockX < this._x) this.moveRight();
			})
			.onHit('Player', function (players) {
				if (!this._dead) players[0].obj.kill();
			})
			.bind('EnterFrame', this.moving);


		this.reel('walking', 300, [
				[27, 4],
				[28, 4]
			])
			.reel('falling', 1000, [
				[27, 4]
			])
			.reel('dead', 10000, [
				[31, 4]
			])
			.reel('attack', 200, [
				[29, 4],
				[30, 4]
			])
			.animate('walking', -1);

		setInterval(function () {
			if( !this._dead ) {
				this.animate('attack', 1);
				var fire = Crafty.e('DemonFire').attr({ x: this._x, y: this._y });
				if( this._flipX ) fire.moveLeft();
				setTimeout(function(){
					this.animate('walking', -1);
				}.bind(this), 200);
			}
		}.bind(this), 2000);
	},

	facePlayer: function () {
		if (this._x > Game.player._x && this._xDirection === 1) this.moveLeft();
		if (this._x < Game.player._x && this._xDirection === -1) this.moveRight();
		return this;
	},

	moving: function () {
		if (!this._falling) {
			this.resumeAnimation();
			this.x += this._xDirection * this._speed;
		}
		else {
			this.pauseAnimation();
			this.x += this._xDirection * (this._speed / 2);
		}

		if (this._y > this._gameHeight) this.y = 0;
	},

	kill: function () {
		if (!this._dead) {
			this._dead = true;
			this.unbind('EnterFrame', this.moving);
			this.animate('dead', -1);
			Game.addPoints(10);
			Crafty.e('Ghost').attr({ x: this._x, y: this._y });
			Crafty.e('Skeleton').attr({ x: this._x, y: this._y });
		}
	},

	moveLeft: function () {
		this._xDirection = -1;
		this.flip();
		return this;
	},

	moveRight: function () {
		this._xDirection = 1;
		this.unflip();
		return this;
	}
});