Crafty.c( 'MouseEvents', {
	_events: {
		click    : 'Click',
		dblclick : 'DblClick',
		mousedown: 'MouseDown',
		mouseup  : 'MouseUp',
		mousemove: 'MouseMove',
		mouseover: 'MouseOver',
		mouseout : 'MouseOut'
	},

	init: function() {
		for( var type in this._events ) {
			Crafty.addEvent( this, Crafty.stage.elem, type, this.dispatch );
		}
	},

	dispatch: function( e ) {
		this.trigger( this._events[e.type], e );
	}
} );