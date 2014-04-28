Crafty.c('BlockCollision', {
	init: function () {
		this.requires('2D, Collision, Gravity');

		this.bind('Moved', function (from) {
			if (this.hit('Block')) {
				this.x = from.x;
				if (from.y > this.y) this._up = false;
			}

			if (this.y > Game.height) this.y = 0;
		});
		this.gravity('Platform');
	}
});