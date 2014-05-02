Crafty.c('Player', {
	_shurikens: 4,
	_countText: null,

	init: function () {
		this.requires('Position, Canvas, PlayerInput, BlockCollision, ThrowableCollision, MouseEvents, SpriteAnimation, GfxPlayer');

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

		this.bind('NewDirection', this.setAnimation);
	},

	setAnimation: function (direction) {
		var reel;
		if (direction.x) reel = 'running';
		if (direction.y) reel = 'jumping';
		if (direction.x + direction.y === 0) reel = 'standing';
		this.animate(reel, -1);
	},

	kill: function () {
		this.destroy();
		Crafty.e('Player').setPosition(15, 18);
	},

	configProperties: function () {
		this.attr({ w: Game.gridSize, h: Game.gridSize })
			.origin('center')
			.gravityConst(0.5);
	},

	configInput: function () {
		this.twoway(6, 15)
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
		if (this._shurikens > 0) {
			Crafty.e('Shuriken').throw(
				{ x: this.x, y: this.y },
				Crafty.DOM.translate(e.clientX, e.clientY)
			);

			this._shurikens--;
		}
	}
});