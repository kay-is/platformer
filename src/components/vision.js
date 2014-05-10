Crafty.c( 'Vision', {
	_vision: null,

	init: function() {
		this._vision = Crafty.e( '2D, Collision' );
		this.attach( this._vision );
	},

	vision: function( polygon ) {
		polygon = polygon || new Crafty.circle( Game.gridSize / 2, Game.gridSize / 2, 100 );
		this._vision.collision( polygon );
	},

	sees: function( what, callback ) {
		this._vision.onHit( what, callback.bind(this) );
	}
} );