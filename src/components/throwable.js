Crafty.c('Throwable', {
	speed: 16,
	rotationSpeed: 30,
	stuck: false,

	init: function () {
		this.requires('2D, Canvas, Gravity, Collision, DirectedMotion, WiredHitBox');

		this.origin(16, 16)
			.gravity('Ground')
			.gravityConst(0.3)
			.attr({ w: 32, h: 32 })
			.onHit('Block', this.stick)
			.onHit('Enemy', function (enemies) {
				if( !this.stuck ) enemies[0].obj.kill();
			})
			.collision(new Crafty.circle(this._origin.x, this._origin.y, 15));
	},

	stick: function () {
		this.stuck = true;
	},

	'throw': function (source, target) {
		this.attr({ x: source.x, y: source.y });
		this.target(target);
		this.bind('EnterFrame', this.fly);
	},

	fly: function () {
		if (this.stuck) {
			this.moveInDirection(this.speed - 10);
			this.unbind('EnterFrame', this.fly);
			this.antigravity();
			this.z--;
		} else {
			console.log( this );
			this.moveInDirection(this.speed);
			if (this.y > Game.height) this.y = 0;
		}
	}
});