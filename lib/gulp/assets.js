const _ = require('lodash')
const source = require('vinyl-source-stream')
const browserify = require('browserify')
const watchify = require('watchify')
const babelify = require('babelify')
const reactJade = require('react-jade')

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
  vendor: {
    corejs:        'bower_components/core.js/client/shim.js',
    regenerator:   'bower_components/regenerator/runtime.js',
    react:         'bower_components/react/react.js',
    lodash:        'bower_components/lodash/lodash.js',
    eventemitter3: 'bower_components/eventemitter3/index.js',
  },
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
  transform: [reactJade({ globalReact: true }), babelify],
  run(bundle){
    return bundle
      .external(_.keys(PATH.vendor))
      .bundle()
      .pipe(source('tc.js'))
      .pipe(gulp.core.dest(PATH.dest))
  }
})

gulp.helper.taskWithWatch('assets:vendor.js', _.values(PATH.vendor), () =>
  gulp.core.src(_(PATH.vendor).values().sort().value())
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
