Crafty.c( 'Shuriken', {
	speed        : 16,
	rotationSpeed: 30,
	stuck        : false,

	init: function() {
		this.requires( '2D, Canvas, Gravity, Collision, DirectedMotion, GfxShuriken' );

		this.origin( 12, 12 )
			.gravity( 'Ground' )
			.gravityConst( 0.3 )
			.attr( { w: 24, h: 24 } )
			.onHit( 'Block', this.stick )
			.collision(new Crafty.circle(this._origin.x, this._origin.y, 10));
	},

	stick: function() { this.stuck = true; },

	'throw': function( source, target ) {
		this.attr( { x: source.x, y: source.y } );
		this.target( target );
		this.bind( 'EnterFrame', this.fly );
	},

	fly: function() {
		if( this.stuck ) {
			this.moveInDirection( this.speed-10 );
			this.unbind( 'EnterFrame', this.fly );
			this.antigravity();
			this.z--;
		} else {
			this.moveInDirection( this.speed );
			this.attr({ rotation: this.rotation + 30 });
			if( this.y > Game.height ) this.y = 0;
		}
	}
} );