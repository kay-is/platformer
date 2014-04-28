Crafty.c('Player', {
	_shurikens: 4,
	_countText: null,

	init: function () {
		this.requires('Position, Canvas, Color, PlayerInput, BlockCollision, ThrowableCollision, MouseEvents');

		this.configProperties();
		this.configInput();

		this.initCountText();
	},

	configProperties: function () {
		this.attr({ w: Game.gridSize, h: Game.gridSize * 2 })
			.origin('center')
			.gravityConst(0.564)
			.color('black');
	},

	configInput: function () {
		this.twoway(6, 15)
			.bind('NewDirection', function (e) {
				if (e.x > 0) this.unflip();
				else if (e.x < 0) this.flip();
			})
			.bind('MouseDown', function (e) {
				if (e.button == Crafty.mouseButtons.LEFT) this.throw(e);
			});
	},

	initCountText: function () {
		this._countText = Crafty.e('2D, Canvas, Text')
			.text(this._shurikens)
			.textColor('#ffffff')
			.textFont({size: '20px'})
			.attr({
				x: this.x + 10,
				y: this.y + 10
			});

		this.attach(this._countText);
	},

	takeKnife: function (shurikens) {
		shurikens[0].obj.destroy();
		this._shurikens++;
		this._countText.text(this._shurikens);
	},

	'throw': function (e) {
		if (this._shurikens > 0) {
			Crafty.e('Shuriken').throw(
				{ x: this.x, y: this.y },
				Crafty.DOM.translate(e.clientX, e.clientY)
			);

			this._shurikens--;
			this._countText.text(this._shurikens);
		}
	}
});