const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const browserSync = require('browser-sync').create();

// compile scss to css
async function style() {
	return (
		// 1. Locate scss file
		gulp
			.src('./css/**/*.scss')
			// 2. pass that file through sass compiler
			.pipe(sass().on('error', sass.logError))
			// 3. Locate css file
			.pipe(gulp.dest('./css'))
			// stream changes to browser
			.pipe(browserSync.stream())
	);
}

// Watch file and update change auto
async function watch() {
	browserSync.init({
		server: {
			baseDir: './',
		},
	});
	gulp.watch('./css/**/*.scss', style);
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
