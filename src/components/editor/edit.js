Crafty.scene('Edit', function () {
	Crafty.background('white');

	Crafty.viewport.scale(Game.scale);

	var slider = createTimeSlider();

	var editor = Crafty.e('Editor');

	slider.addEventListener('mouseup', function (e) {
		editor.setTime(e.target.value);
	});
});

function createTimeSlider() {
	var timeRange = document.createElement('input');
	timeRange.setAttribute('type', 'range');
	timeRange.setAttribute('min', '0');
	timeRange.setAttribute('max', '300');
	timeRange.setAttribute('step', '10');
	timeRange.setAttribute('value', '0');
	document.body.appendChild(timeRange);

	return timeRange;
}