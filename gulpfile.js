const { src, dest, watch, parallel, series, task } = require("gulp");

const dartSass = require("sass");
const gulpSass = require("gulp-sass");
const scss = gulpSass(dartSass);
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const ghPages = require("gh-pages");
const path = require("path");

function browsersync() {
	browserSync.init({
		server: {
			baseDir: "app/",
		},
	});
}

function cleanDist() {
	return del("dist");
}

function images() {
	return src("app/images/**/*").pipe(dest("dist/images"));
}

function scripts() {
	return src([
		"node_modules/slick-carousel/slick/slick.js",
		"node_modules/wowjs/dist/wow.js",
		"app/js/main.js",
	])
		.pipe(concat("main.min.js"))
		.pipe(uglify())
		.pipe(dest("app/js"))
		.pipe(browserSync.stream());
}

function styles() {
	return src("app/scss/style.scss")
		.pipe(scss({ outputStyle: "compressed" }))
		.pipe(concat("style.min.css"))
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 10 version"],
				grid: true,
			})
		)
		.pipe(dest("app/css"))
		.pipe(browserSync.stream());
}

function stylesLibs() {
	return src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/animate.css/animate.css'
  ])
		.pipe(concat("_libs.scss"))
		.pipe(dest("app/scss"))
		.pipe(browserSync.reload({ stream: true }));
}

function watching() {
	watch(["app/scss/**/*.scss"], styles);
	watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
	watch(["app/*.html"]).on("change", browserSync.reload);
}

function build() {
	return src(
		[
			"app/css/style.min.css",
			"app/fonts/**/*",
			"app/js/main.min.js",
			"app/*.html",
		],
		{ base: "app" }
	).pipe(dest("dist"));
}

function deploy(cb) {
	ghPages.publish(path.join(process.cwd(), "./dist"), cb);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.stylesLibs = stylesLibs;

exports.build = series(cleanDist, build, images);
exports.default = parallel(stylesLibs, styles, scripts, browsersync, watching);

exports.deploy = deploy;

// task('deploy', function() {
//   return src('./dist/**/*')
//       .pipe(ghPages());
// });
