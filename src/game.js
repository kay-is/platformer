Game = {
	gridSize: 32,
	height: innerHeight - 20,
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
			Game.initSprites();

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
	},

	initSprites: function () {
		Crafty.sprite(32, Game.sprites, {
			GfxShuriken: [27, 39],
			GfxPlayer: [26, 1],
			GfxRedBlock: [0, 4],
			GfxRedPlatform: [0, 5],
			GfxBlueBlock: [1, 4],
			GfxBluePlatform: [1, 5],
			GfxGreyBlock: [2, 4],
			GfxGreyPlatform: [2, 5],
			GfxYellowBlock: [3, 4],
			GfxYellowPlatform: [3, 5],
			GfxGreenBlock: [4, 4],
			GfxGreenPlatform: [4, 5]
		});
	}
};

window.addEventListener('load', Game.start);