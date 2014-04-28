Crafty.c( 'DirectedMotion', {
	_direction: null,

	init: function() {
		this.requires( '2D' );
		this._direction = {x: 0, y: 0 };
	},

	target: function( target ) {
		var d = this._direction, length;

		d.x = target.x - this.x;
		d.y = target.y - this.y;

		length = Math.sqrt( d.x * d.x + d.y * d.y );

		d.x /= length;
		d.y /= length;

		this._direction = d;
	},

	moveInDirection: function( speed ) {
		this.attr( {
			x       : this.x + this._direction.x * speed,
			y       : this.y + this._direction.y * speed
		} );
	}
} );