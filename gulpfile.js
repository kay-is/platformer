var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var jsLintGlobs = [
	'src/*.js',
	'src/maps/*.js',
	'src/components/*.js',
	'src/scenes/*.js'];

var jsGlobs = [
	'lib/*.js',
	'src/*.js',
	'src/maps/*.js',
	'src/components/*.js',
	'src/scenes/*.js'
];

gulp.task('lint', function () {
	return gulp.src(jsLintGlobs)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
	return gulp.src(jsGlobs)
		.pipe(concat('game.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('assets', function () {
	return gulp.src('res/*')
		.pipe(gulp.dest('dist/res'));
});

// Watch Files For Changes
gulp.task('watch', function () {
	gulp.watch(jsGlobs, ['lint', 'scripts']);
});

gulp.task('default', ['lint', 'scripts', 'assets']);