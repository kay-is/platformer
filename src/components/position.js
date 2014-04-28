Crafty.c('Position', {
	setPosition: function (x, y) {
		return this.attr({
			x: Game.gridSize * x,
			y: Game.gridSize * y
		});
	}
});