Crafty.c('PlayerInput', {
	_speed: 3,
	_up: false,

	_keys: {
		W: -90,
		A: 180,
		D: 0
	},

	init: function () {
		this.requires("Fourway, Keyboard, Gravity");
	},

	twoway: function (speed, jump) {

		this.multiway(speed, this._keys);

		if (speed) this._speed = speed;
		if (arguments.length < 2) {
			this._jumpSpeed = this._speed * 2;
		} else {
			this._jumpSpeed = jump;
		}

		this.bind("EnterFrame", function () {
			if (this.disableControls) return;
			if (this._up) {
				this.y -= this._jumpSpeed;
				this._falling = true;
				this.trigger('Moved', { x: this._x, y: this._y + this._jumpSpeed });
			}
		});

		/*
		 this.bind("KeyDown", function (e) {
		 if( !this._falling &&
		 (e.key === Crafty.keys.UP_ARROW ||
		 e.key === Crafty.keys.W ||
		 e.key === Crafty.keys.Z
		 )
		 ) this._up = true;
		 });
		 */
		return this;
	}
});