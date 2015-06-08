let _ = require('lodash')
let isparta = require('isparta')

let gulp = require('gulp')
_.extend(gulp, {
  jshint:      require('gulp-jshint'),
  mocha:       require('gulp-mocha'),
  istanbul:    require('gulp-istanbul'),
  plumber:     require('gulp-plumber'),
  runSequence: require('run-sequence'),
})

const PATH = {
  meta:    ['.jshintrc', '*.{js,json}'],
  lib:     ['lib/**/*.js'],
  test:    ['test/**/*.js'],
  profile: ['profile/**/*.js'],
}
PATH.all = _(PATH).values().flatten().value()

gulp.task('lint', () =>
  gulp.src(PATH.all)
    .pipe(gulp.jshint())
    .pipe(gulp.jshint.reporter('default'))
)

gulp.task('mocha', () =>
  gulp.src(PATH.test)
    .pipe(gulp.mocha({ reporter: 'dot' }))
)

gulp.task('istanbul-init', () =>
  gulp.src(PATH.lib)
    .pipe(gulp.istanbul({ instrumenter: isparta.Instrumenter }))
    .pipe(gulp.istanbul.hookRequire())
)

gulp.task('mocha-coverage', ['istanbul-init'], () =>
  gulp.src(PATH.test)
    .pipe(gulp.plumber())
    .pipe(gulp.mocha({ reporter: 'dot' }))
    .pipe(gulp.istanbul.writeReports({ reporters: ['lcov'] }))
)

gulp.task('mocha', (done) => {
  if(process.env.TC_COVERAGE){
    gulp.runSequence('mocha-coverage', done)
  } else {
    return gulp.src(PATH.test)
      .pipe(gulp.mocha({ reporter: 'dot' }))
  }
})

gulp.task('test', (done) => {
  gulp.runSequence('lint', 'mocha', done)
})

gulp.task('watch-test', () =>
  gulp.watch(PATH.all, ['test'])
)

gulp.task('default', ['test'])
