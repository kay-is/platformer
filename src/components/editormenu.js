Crafty.c('EditorMenu', {
	init: function () {
		var self = this, i, sprite;
		this.requires('2D, Canvas, Color');

		this.color('grey')
			.attr({w: 170, h: 130});

		var sprites = [
			'GfxRedBlock',
			'GfxRedPlatform',
			'GfxBlueBlock',
			'GfxBluePlatform',
			'GfxGreyBlock',
			'GfxGreyPlatform',
			'GfxYellowBlock',
			'GfxYellowPlatform',
			'GfxGreenBlock',
			'GfxGreenPlatform'
		];

		var x = this._x + 8;
		var y = this._y + 8;
		for (i in sprites) {
			sprite = Crafty.e('2D, Canvas, Mouse, ' + sprites[i]);
			sprite._type = sprites[i];
			sprite.attr({x: x, y: y });
			this.attach(sprite);

			sprite.bind('Click', function () {
				self.trigger('Select', this._type );
			});

			x += 40;
			if (x >= 160) {
				x = 8;
				y += 40;
			}
		}
	}
});