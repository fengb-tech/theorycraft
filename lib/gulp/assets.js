const _ = require('lodash')
const source = require('vinyl-source-stream')
const browserify = require('browserify')
const watchify = require('watchify')
const babelify = require('babelify')
const reactJade = require('react-jade')
const browserifyShim = require('browserify-shim')

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
  tc:     ['lib/assets/js/tc.js'],
  vendor: [
    'bower_components/core.js/client/shim.js',
    'bower_components/regenerator/runtime.js',
    'bower_components/react/react.js',
    'bower_components/lodash/lodash.js',
    'bower_components/eventemitter3/index.js',
  ],
}

function browserifyTaskWithWatch(name, options){
  let bundle = browserify(_.defaults(options, {
    cache: {},
    packageCache: {},
    debug: true,
  }))

  gulp.core.task(name, () => options.run(bundle))
  gulp.core.task(`watch:${name}`, () => {
    let wundle = watchify(bundle)
    wundle.on('update', () => options.run(wundle))
    wundle.on('log', gulp.util.log)
    return options.run(wundle)
  })
}

browserifyTaskWithWatch('assets:tc.js', {
  entries: PATH.tc,
  transform: [reactJade({ globalReact: true }), babelify, browserifyShim],
  run(bundle){
    return bundle
      .bundle()
      .pipe(source('tc.js'))
      .pipe(gulp.core.dest(PATH.dest))
  },
})

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

gulp.core.task('assets', ['assets:tc.js', 'assets:vendor.js', 'assets:css'])

gulp.core.task('watch:assets', ['watch:assets:tc.js', 'watch:assets:vendor.js', 'watch:assets:css'])
