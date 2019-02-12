var gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCss = require('gulp-clean-css'),
	gulpIf = require('gulp-if'),
	imagemin = require("gulp-imagemin"),
	imageminJpegRecompress = require('imagemin-jpeg-recompress'),
	pngquant = require('imagemin-pngquant'),
	browserSync = require('browser-sync').create();

var config = {
	paths: {
		scss: './src/scss/**/*.scss',
		html: './public/index.html',
		js: './src/js/**/*.js',
		img: './src/img/*.{png,jpg}'
	},
	output: {
		cssName: 'bundle.min.css',
		path: './public',
		js: './public/js',
		img: './public/img/'
	},
	isDevelop: true
};

gulp.task('scss', function () {
	return gulp.src(config.paths.scss)
		.pipe(gulpIf(config.isDevelop, sourcemaps.init()))
		.pipe(sass())
		.pipe(concat(config.output.cssName))
		.pipe(autoprefixer({
			browsers: ['last 2 version']
		}))
		.pipe(gulpIf(!config.isDevelop, cleanCss()))
		.pipe(gulpIf(config.isDevelop, sourcemaps.write()))
		.pipe(gulp.dest(config.output.path))
		.pipe(browserSync.stream());
});

gulp.task('serve', function () {
	browserSync.init({
		server: {
			baseDir: config.output.path
		}
	});

	gulp.watch(config.paths.scss, ['scss']);
	gulp.watch(config.paths.js, ['js']);
	gulp.watch(config.paths.html).on('change', browserSync.reload);

});

gulp.task('default', ['scss', 'serve', 'js']);

gulp.task('js', function () {
	return gulp.src(config.paths.js)
		.pipe(gulp.dest(config.output.js));
});

gulp.task('images', function () {
	return gulp.src(config.paths.img)
		.pipe(imagemin([
			imagemin.jpegtran({
				progressive: true
			}),
			imageminJpegRecompress({
				loops: 5,
				min: 65,
				max: 70,
				quality: 'medium'
			}),
			imagemin.optipng({
				optimizationLevel: 3
			}),
			pngquant({
				quality: '65-70',
				speed: 5
			})
		]))
		.pipe(gulp.dest(config.output.img));
});