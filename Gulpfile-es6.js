let _ = require('lodash')
let isparta = require('isparta')

let gulp = require('gulp')
_.extend(gulp, {
  jshint:   require('gulp-jshint'),
  mocha:    require('gulp-mocha'),
  print:    require('gulp-print'),
  istanbul: require('gulp-istanbul'),
})

let paths = {
  meta: ['.jshintrc', '*.{js,json}'],
  lib:  ['lib/**/*.js'],
  test: ['test/**/*.js'],
}
paths.all = _(paths).values().flatten().value()

gulp.task('files', () =>
  gulp.src(paths.all)
    .pipe(gulp.print())
)

gulp.task('lint', () =>
  gulp.src(paths.all)
    .pipe(gulp.jshint())
    .pipe(gulp.jshint.reporter('default'))
)

gulp.task('mocha', () =>
  gulp.src(paths.lib)
    .pipe(gulp.istanbul({ instrumenter: isparta.Instrumenter }))
    .pipe(gulp.istanbul.hookRequire())
    .on('finish', () =>
      gulp.src(paths.test)
        .pipe(gulp.mocha({ reporter: 'dot' }))
        .pipe(gulp.istanbul.writeReports({ reporters: ['lcov'] }))
    )
)

gulp.task('test', ['lint', 'mocha'])

gulp.task('watch-test', () =>
  gulp.watch(paths.all, ['lint', 'test'])
)

gulp.task('default', ['test'])
