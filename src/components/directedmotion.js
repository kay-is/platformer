Crafty.c('DirectedMotion', {
	_direction: null,

	init: function () {
		this.requires('2D');
		this._direction = {x: 0, y: 0 };
	},

	target: function (target) {
		var d = this._direction, length;

		d.x = target.x - this.x;
		d.y = target.y - this.y;

		length = Math.sqrt(d.x * d.x + d.y * d.y);

		d.x /= length;
		d.y /= length;

		this._direction = d;
		return this;
	},

	moveInDirection: function (speed, target) {
		var from = { x: this._x, y: this._y };
		if (target) this.target(target);

		if (this._direction.x > 0) this.unflip();
		else this.flip();


		this.attr({
			x: this.x + this._direction.x * speed,
			y: this.y + this._direction.y * speed
		});

		this.trigger('Moved', from);

		return this;
	}
});