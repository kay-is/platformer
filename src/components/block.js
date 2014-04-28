Crafty.c('Block', {
	type: 'default',

	_platform: null,

	_wallSprites: [
		'GfxBlock1',
		'GfxBlock2',
		'GfxBlock3',
		'GfxBlock4',
		'GfxBlock5',
		'GfxBlock6',
		'GfxBlock7'
	],

	_groudSprites: [
		'GfxBlock8',
		'GfxBlock9',
		'GfxBlock11',
		'GfxBlock12',
		'GfxBlock13',
		'GfxBlock14'
	],

	_sprite: null,

	init: function () {
		this._sprite = Crafty.math.randomElementOfArray(this._groudSprites);

		this.requires('2D, Position, Canvas');

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
		this._sprite = Crafty.math.randomElementOfArray(this._wallSprites);
		this.addComponent(this._sprite);
	}
});