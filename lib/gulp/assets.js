const gulp = {
  core:   require('gulp'),
  concat: require('gulp-concat'),
  sass:   require('gulp-sass'),
  util:   require('gulp-util'),
  helper: require('./helper'),
}

const PATH = {
  dest:   'public/assets',
  sass:   ['lib/assets/css/**/*.scss'],
  vendor: [
    'node_modules/babel-core/browser-polyfill.js',
    'node_modules/babel-core/external-helpers.js',
    'node_modules/riot/riot.js',
    'node_modules/lodash/index.js',
    'node_modules/eventemitter3/index.js',
    'node_modules/pixi.js/bin/pixi.js',
    'node_modules/pixi-spine/bin/pixi-spine.js',
  ],
}

gulp.helper.taskWithWatch('assets:vendor.js', PATH.vendor, () =>
  gulp.core.src(PATH.vendor)
    .pipe(gulp.concat('vendor.js', { newLine: ';' }))
    .pipe(gulp.core.dest(PATH.dest))
)

gulp.helper.taskWithWatch('assets:css', PATH.sass, () =>
  gulp.core.src(PATH.sass)
    .pipe(gulp.sass().on('error', gulp.sass.logError))
    .pipe(gulp.core.dest(PATH.dest))
)

gulp.core.task('assets', ['assets:vendor.js', 'assets:css'])

gulp.core.task('watch:assets', ['watch:assets:vendor.js', 'watch:assets:css'])
