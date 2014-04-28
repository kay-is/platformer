Crafty.c( 'Player', {
	knifes   : 4,
	knifeText: null,

	init: function() {
		this.requires( '2D, Position, Canvas, Color, Twoway, Collision, Gravity, MouseEvents' );

		this.configProperties();
		this.configCollision();
		this.configInput();

		this.initKnifeCountText();
	},

	configProperties: function() {
		this.attr( { w: Game.gridSize, h: Game.gridSize * 2 } );
		this.origin( 'center' );
		this.gravity( 'Platform' );
		this.gravityConst( 0.564 );
		this.color( 'black' );
	},

	configCollision: function() {
		this.bind( 'Moved', function( from ) {
			if( this.hit( 'Block' ) ) {
				this.x = from.x;
				if( from.y > this.y ) this._up = false;
			}

			if( this.y > Game.height ) this.y = 0;
		} );

		this.onHit( 'Shuriken', function( e ) {
			if( e[0].obj.stuck ) this.takeKnife( e );
		} );
	},

	configInput: function() {
		this.twoway( 6, 15 );

		this.bind( 'NewDirection', function( e ) {
			if( e.x > 0 ) this.unflip();
			else if( e.x < 0 ) this.flip();
		} );

		this.bind( 'MouseDown', function( e ) {
			if( e.button == Crafty.mouseButtons.LEFT ) this.throwKnife( e );
		} );
	},

	initKnifeCountText: function() {
		this.knifeText = Crafty.e( '2D, Canvas, Text' )
			.text( this.knifes )
			.textColor( '#ffffff' )
			.textFont( {size: '20px'} )
			.attr( {
				x: this.x + 10,
				y: this.y + 10
			} );

		this.attach( this.knifeText );
	},

	takeKnife: function( knifes ) {
			knifes[0].obj.destroy();
			this.knifes++;
			this.knifeText.text( this.knifes );
	},

	throwKnife: function( e ) {
		if( this.knifes > 0 ) {
			Crafty.e( 'Shuriken' ).throw(
				{ x: this.x, y: this.y },
				Crafty.DOM.translate( e.clientX, e.clientY )
			);

			this.knifes--;
			this.knifeText.text( this.knifes );
		}
	}
} );