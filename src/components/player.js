Crafty.c('Player', {
	_shurikens: 3,
	_countText: null,

	init: function () {
		this.requires('Position, Canvas, Twoway, BlockCollision, ThrowableCollision, MouseEvents, SpriteAnimation, GfxPlayer');

		this.configProperties();
		this.configInput();
		this.configAnimation();
	},

	configAnimation: function () {
		this.reel('standing', 10000, [
			[26, 1]
		]);

		this.reel('running', 150, [
			[27, 1],
			[28, 1]
		]);

		this.reel('attacking', 300, [
			[29, 1],
			[30, 1],
			[26, 1]
		]);

		this.reel('dead', 10000, [
			[31, 1]
		]);

		this.bind('NewDirection', this.runningAnimation);

		this.bind('Moved', function (from) {
			if( this._y !== from.y ) this.pauseAnimation();
			else this.resumeAnimation();
		});
	},

	runningAnimation: function (direction) {
		if( !this._dead ) {
			var reel;

			if (direction.x) reel = 'running';
			if (direction.x + direction.y === 0) reel = 'standing';

			this.animate(reel, -1);
		}
	},

	kill: function () {
		if( !this._dead ) {
			this._dead = true;
			this.twoway(0,0);
			this.animate('dead', -1);
			setTimeout(function(){
				this.destroy();
				Game.player = Crafty.e('Player' ).setPosition(15,18);
			}.bind(this), 2000);
		}
	},

	configProperties: function () {
		this.attr({ w: Game.gridSize, h: Game.gridSize })
			.gravityConst(0.55);
	},

	configInput: function () {
		this.twoway(5, 11)
			.bind('NewDirection', function (e) {
				if (e.x > 0) this.unflip();
				else if (e.x < 0) this.flip();
			})
			.bind('MouseDown', function (e) {
				if (e.button == Crafty.mouseButtons.LEFT) {
					this.animate('attacking', 1);
					this.throw(e);
				}
			});
	},

	takeKnife: function (shurikens) {
		shurikens[0].obj.destroy();
		this._shurikens++;
	},

	'throw': function (e) {
		var click;

		if (this._shurikens > 0) {
			click = { x: e.clientX, y: e.clientY };
			Crafty.e('Shuriken').throw(
				{ x: this.x, y: this.y - 5 },
				Crafty.DOM.translate(click.x, click.y)
			);

			this._shurikens--;
		}
	}
});