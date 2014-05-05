Crafty.c('Editor', {
	_blocks: null,
	_time: 0,
	_menu: null,
	_currentType: 'GfxRedBlock',

	init: function () {
		var canvas = Crafty.canvas._canvas;
		this._blocks = {};

		this.requires('2D, Canvas, Mouse');

		this.attr({ x: 0, y: 0, w: canvas.width, h: canvas.height });

		this.bind('MouseDown', this.dispatch);
	},

	setTime: function (seconds) {
		this._time = seconds;
	},

	dispatch: function (click) {
		var mousePosition = Crafty.DOM.translate(click.clientX, click.clientY);
		var x = mousePosition.x - (mousePosition.x % Game.gridSize);
		var y = mousePosition.y - (mousePosition.y % Game.gridSize);

		switch (click.mouseButton) {
			case Crafty.mouseButtons.LEFT:
				this.placeBlock(x, y);
				break;
			case Crafty.mouseButtons.RIGHT:
				this.showMenu(mousePosition);
				break;
		}
	},

	placeBlock: function (x, y) {
		var block = Crafty.e('Block, Mouse').attr({x: x, y: y});
		block.removeComponent(block._sprite);
		block.addComponent(this._currentType);
		block.bind('MouseDown', function () {
			block.destroy();
		});
	},

	showMenu: function (mousePosition) {
		var self = this;
		if (this._menu) this._menu.destroy();

		this._menu = Crafty.e('EditorMenu').attr(mousePosition);

		this._menu.bind('Select', function (selection) {
			self._menu.destroy();
			self._currentType = selection;
		});
	},

	exportMap: function () {
		var id, map = [], block;
		for (id in this._blocks) {
			block = this._blocks[id];
			map.push([block.type, block.x, block.y, !!block._platform]);
		}

		console.log('This map has ' + map.length + ' blocks');
		console.log('The map definition: ' + JSON.stringify(map));
	}
});