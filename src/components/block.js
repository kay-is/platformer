Crafty.c('Block', {
	_sprite: null,

	init: function () {
		this.requires('2D, Position, Canvas');

		this.attr({ w: Game.gridSize, h: Game.gridSize });

		this.bind('NewComponent', function (components) {
			var sprite = components[0];
			this._sprite = sprite;
			if (sprite.toLowerCase().search('platform') !== -1) {
				this.attach(Crafty.e('2D, Canvas, Platform').attr({
					h: 3,
					w: this.w,
					x: this.x,
					y: this.y
				}));
			}
		});
	},

	setSprite: function (sprite) {
		return this.addComponent(sprite);
	},

	getSprite: function () {
		return this._sprite;
	}
});