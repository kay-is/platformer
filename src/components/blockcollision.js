Crafty.c('BlockCollision', {
	_stuck: false,
	init: function () {
		this.requires('2D, Collision, Gravity');

		this.bind('Moved', function (from) {
			if (this.hit('Block')) {
				this.x = from.x;
				if (from.y > this.y) this._up = false;
			}

			if (this._y > Crafty.DOM.translate(0, Game.height).y) this.y = 0;
		});
		this.gravity('Platform');
	}
});