Crafty.c('Flame', {
	_xDirection: 1,
	_speed: 1,
	_canAttack: true,
	_attacking: false,

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
				if (!this._dead && this._attacking) players[0].obj.kill();
			})
			.bind('EnterFrame', this.moving)
			.bind('Fallen', this.facePlayer);

		this.reel('walking', 800, [
			[27, 13],
			[30, 13]
		]);

		this.reel('dead', 10000, [
			[31, 13]
		]);

		this.reel('attacking', 200, [
			[36, 13]
		]);

		this.animate('walking', -1);

		this.initAttackBehaviour();
	},

	initAttackBehaviour: function () {
		var sight = Crafty.e('2D, Collision')
			.attr({w: 150, h: Game.gridSize});

		sight.attr({x: this._x - 60 });

		sight.onHit('Player', function () {
			if (this._canAttack) {
				this._canAttack = false;
				this.facePlayer();
				this._speed = 7;
				this._attacking = true;
				this.animate('attacking');
				setTimeout(function () {
					this._speed = 1;
					this._attacking = false;
					this.animate('walking', -1);
					setTimeout(function () {
						this._canAttack = true;
					}.bind(this), 1500)
				}.bind(this), 200);
			}
		}.bind(this));

		this.attach(sight);
	},

	facePlayer: function () {
		if (this._x > Game.player._x && this._xDirection === 1) this.moveLeft();
		if (this._x < Game.player._x && this._xDirection === -1) this.moveRight();
		return this;
	},

	_fallen: false,
	moving: function () {
		if (!this._falling) {
			this.x += this._xDirection * this._speed;
			if (this._fall) {
				this.trigger('Fallen');
			}
			this._fall = false;
		} else {
			this._fall = true;
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