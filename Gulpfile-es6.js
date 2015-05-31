let _ = require('lodash')
let isparta = require('isparta')

let gulp = require('gulp')
_.extend(gulp, {
  jshint:   require('gulp-jshint'),
  mocha:    require('gulp-mocha'),
  print:    require('gulp-print'),
  istanbul: require('gulp-istanbul'),
  plumber:  require('gulp-plumber'),
})

const PATH = {
  meta: ['.jshintrc', '*.{js,json}'],
  lib:  ['lib/**/*.js'],
  test: ['test/**/*.js'],
}
PATH.all = _(PATH).values().flatten().value()

gulp.task('files', () =>
  gulp.src(PATH.all)
    .pipe(gulp.print())
)

gulp.task('lint', () =>
  gulp.src(PATH.all)
    .pipe(gulp.jshint())
    .pipe(gulp.jshint.reporter('default'))
)

gulp.task('_istanbul', () =>
  gulp.src(PATH.lib)
    .pipe(gulp.istanbul({ instrumenter: isparta.Instrumenter }))
    .pipe(gulp.istanbul.hookRequire())
)

gulp.task('mocha', ['_istanbul'], () =>
  gulp.src(PATH.test)
    .pipe(gulp.plumber())
    .pipe(gulp.mocha({ reporter: 'dot' }))
    .pipe(gulp.istanbul.writeReports({ reporters: ['lcov'] }))
)

gulp.task('test', ['lint', 'mocha'])

gulp.task('watch-test', () =>
  gulp.watch(PATH.all, ['lint', 'test'])
)

gulp.task('default', ['test'])
