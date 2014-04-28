Crafty.c('ThrowableCollision', {
	init: function () {
		this.requires('Collision');
		this.onHit('Throwable', function (e) {
			if (e[0].obj.stuck) this.takeKnife(e);
		});
	}
});