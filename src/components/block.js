Crafty.c('Block', {
	type: 'default',

	_platform: null,

	_sprite: null,

	init: function () {
		this.requires('2D, Position, Canvas');
		this._sprite = 'GfxGreenBlock';

		this.addComponent(this._sprite);

		this.attr({ w: Game.gridSize, h: Game.gridSize });

		this._platform = Crafty.e('2D, Canvas, Platform').attr({
			h: 3,
			w: this.w,
			x: this.x,
			y: this.y
		});

		this.attach(this._platform);
	},

	removePlatform: function () {
		this.detach(this._platform);
		this._platform.destroy();
		delete this._platform;

		this.removeComponent(this._sprite);
		this._sprite = 'GfxGreenPlatform';
		this.addComponent(this._sprite);
	}
});