Crafty.c('Editor', {
	blocks: null,

	init: function () {
		var canvas = Crafty.canvas._canvas;
		this.blocks = {};

		this.requires('2D, Canvas, Mouse');

		this.attr({ x: 0, y: 0, w: canvas.width, h: canvas.height });

		this.bind('MouseDown', this.dispatch);
	},

	dispatch: function (click) {
		switch (click.mouseButton) {
			case Crafty.mouseButtons.LEFT:
				this.placeBlock(click);
				break;
			case Crafty.mouseButtons.RIGHT:
				this.exportMap(click);
				break;
		}
	},

	placeBlock: function (click) {
		var mousePosition = Crafty.DOM.translate(click.clientX, click.clientY);
		var x = Math.floor(mousePosition.x / Game.gridSize);
		var y = Math.floor(mousePosition.y / Game.gridSize);
		var block = Crafty.e('Block, Mouse, Collision');

		var top = Crafty.e('2D, Position, Collision');
		top.attr({w: 32, h: 32});
		top.onHit('Block', function () {
			block.removePlatform();
			top.destroy();
		});

		top.setPosition(x, y - 1);

		block.setPosition(x, y);

		block.bind('MouseDown', function () {
			block.destroy();
			delete this.blocks[ block._entityName ];
		}.bind(this));

		this.blocks[ block._entityName ] = block;
	},

	exportMap: function () {
		var id, map = [], block;
		for (id in this.blocks) {
			block = this.blocks[id];
			map.push([block.type, block.x, block.y, !!block._platform]);
		}

		console.log('This map has ' + map.length + ' blocks');
		console.log('The map definition: ' + JSON.stringify(map));
	}
});