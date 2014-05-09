Crafty.scene( 'Menu', function() {
	Crafty.background( 'black' );

	Crafty.viewport.scale( Game.scale );

	var pos = Crafty.DOM.translate( Game.width, Game.height );

	var buttVentures = Crafty.e( '2D, Canvas, Text' )
		.textColor( '#ffffff' )
		.textFont( { family: 'Mojang', size: '50px', weight: 'bold'} )
		.text( 'butt.ventures' )
		.attr( {x: pos.x / 2 - 150, y: pos.y / 2 - 100} );

	var presents = Crafty.e( '2D, Canvas, Text' )
		.textColor( '#ffffff' )
		.textFont( { family: 'Mojang', size: '30px', weight: 'bold'} )
		.text( 'presents' )
		.attr( {x: pos.x / 2 - 20, y: pos.y / 2 - 40} );

	setTimeout( function() {
		buttVentures.destroy();
		presents.destroy();

		Crafty.e( '2D, Canvas, Text' )
			.textColor( '#dd3333' )
			.textFont( { family: 'Mojang', size: '60px', weight: 'bold'} )
			.text( 'ROOK AUTUMN' )
			.attr( {x: pos.x / 2 - 160, y: pos.y / 2 - 100} );

		Crafty.e( '2D, Canvas, Text, Mouse' )
			.textColor( '#ffffff' )
			.textFont( { family: 'Mojang', size: '25px', weight: 'bold'} )
			.text( 'Play' )
			.attr( {x: pos.x / 2 + 20, y: pos.y / 2 } )
			.bind( 'Click', function() {
				Crafty.scene( 'Play' );
			} );
	}, 2000 )
} );