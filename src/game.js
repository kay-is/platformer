Game = {
	gridSize: 32,
	height: innerHeight,
	width: 4 / 3 * innerHeight,
	scale: innerHeight / 768,

	resources: [
		'res/blocks1.png',
		'res/2781-24x24x8.png'
	],

	maps: {},

	start: function () {
		Crafty.init(Game.width, Game.height);
		Crafty.canvas.init();

		Crafty.load(Game.resources, function () {

			Crafty.sprite(24, 'res/2781-24x24x8.png', {
				GfxShuriken: [0, 0]
			});

			Crafty.sprite(32, 'res/blocks1.png', {
				GfxBlock1: [3, 3],
				GfxBlock2: [4, 3],
				GfxBlock3: [5, 3],
				GfxBlock4: [6, 3],
				GfxBlock5: [7, 3],
				GfxBlock6: [8, 3],
				GfxBlock7: [9, 3],

				GfxBlock8: [10, 3],
				GfxBlock9: [11, 3],
				GfxBlock10: [12, 3],
				GfxBlock11: [13, 3],
				GfxBlock12: [14, 3],
				GfxBlock13: [15, 3],
				GfxBlock14: [16, 3],
				GfxBlock15: [17, 3]
			});

			switch (window.location.hash) {
				case '#edit':
					Crafty.scene('Edit');
					break;
				default:
					Crafty.scene('Play');
			}
		});
	}
};

window.addEventListener('load', Game.start);