Game = {
	gridSize: 32,
	height: innerHeight,
	width: 4 / 3 * innerHeight,
	scale: innerHeight / 768,

	score: 0,

	sprites: 'res/simples_pimples.png',

	maps: {},

	start: function () {
		Crafty.init(Game.width, Game.height);
		Crafty.canvas.init();

		Crafty.canvas.context.webkitImageSmoothingEnabled = false;
		Crafty.canvas.context.mozImageSmoothingEnabled = false;
		Crafty.canvas.context.imageSmoothingEnabled = false;

		Crafty.load([Game.sprites], function () {

			Crafty.sprite(32, Game.sprites, {
				GfxPlayer: [26, 1],
				GfxEnemyFire: [27, 13],
				GfxBlock: [4, 23],
				GfxPlatform: [4, 24]
			});

			switch (window.location.hash) {
				case '#edit':
					Crafty.scene('Edit');
					break;
				default:
					Crafty.scene('Play');
			}
		});
	},

	initScore: function () {
		Game.score = 0;
		Game.scoreText = Crafty.e('2D, Canvas, Text')
			.text('Score: 0')
			.textColor('#ffffff')
			.textFont({size: '20px'})
			.attr({x: 10, y: 10, w: 100, h: 30 });
	},

	addPoints: function (points) {
		Game.score += points;

		Game.scoreText.text('Score: ' + Game.score);
	}
};

window.addEventListener('load', Game.start);