Crafty.c('Player', {
	_shurikens: 4,
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

		this.reel('jumping', 10000, [
			[27, 1]
		]);

		this.reel('attacking', 300, [
			[29, 1],
			[30, 1],
			[26, 1]
		]);

		this.reel('dead', 1000, [
			[31, 1]
		]);

		this.bind('NewDirection', this.runningAnimation);
		this.bind('Moved', function () {
			if (this._falling) this.animate('jumping', 1);
		});
	},

	runningAnimation: function (direction) {
		var reel;

		if (direction.x) reel = 'running';
		if (direction.x + direction.y === 0) reel = 'standing';

		this.animate(reel, -1);
	},

	kill: function () {
		this.animate('dead', 1);
		//this.destroy();
		//Crafty.e('Player').setPosition(15, 18);
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
				{ x: this.x, y: this.y },
				Crafty.DOM.translate(click.x, click.y)
			);

			this._shurikens--;
		}
	}
});