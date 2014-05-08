Crafty.c('Editor', {
	_blocks: null,
	_time: 0,
	_menu: null,
	_currentType: 'GfxRedBlock',

	init: function () {
		this._blocks = {};

		this.requires('2D, Canvas, Color, Mouse');

		this.color('lightgrey');
		this.attr({ x: 0, y: 0, w: Game.width / Game.scale, h: Game.height / Game.scale });

		this.bind('MouseDown', this.dispatch);
	},

	setTime: function (seconds) {
		this._time = seconds;
	},

	dispatch: function (click) {
		var mousePosition = Crafty.DOM.translate(click.clientX, click.clientY);
		var x = mousePosition.x - (mousePosition.x % Game.gridSize);
		var y = mousePosition.y - (mousePosition.y % Game.gridSize);

		if (this._menu) this._menu.destroy();

		switch (click.mouseButton) {
			case Crafty.mouseButtons.LEFT:
				this.placeBlock(x, y);
				break;
			case Crafty.mouseButtons.MIDDLE:
				this.exportMap();
				break;
			case Crafty.mouseButtons.RIGHT:
				this.showMenu(mousePosition);
				break;
		}
	},

	placeBlock: function (x, y) {
		var self = this;
		var block = Crafty.e('Block, Mouse')
			.attr({x: x, y: y})
			.setSprite(this._currentType)
			.one('MouseDown', function () {
				if (self._menu) self._menu.destroy();
				block.destroy();
				delete self._blocks[block._entityName];
			});

		this._blocks[block._entityName] = block;
	},

	showMenu: function (mousePosition) {
		var self = this;

		this._menu = Crafty.e('EditorMenu').attr(mousePosition);

		this._menu.one('Select', function (selection) {
			self._menu.destroy();
			self._currentType = selection;
		});
	},

	exportMap: function () {
		var id, map = [], block;
		for (id in this._blocks) {
			block = this._blocks[id];
			map.push([block._x / 32, block._y / 32, block.getSprite()]);
		}

		console.log('This map has ' + map.length + ' blocks');
		console.log('The map definition: ' + JSON.stringify(map));
	}
});