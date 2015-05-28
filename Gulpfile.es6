let gulp = require('gulp')
let jshint = require('gulp-jshint')
let mocha = require('gulp-mocha')
let gprint = require('gulp-print')
let _ = require('lodash')

let paths = {
  meta: ['.jshintrc', '*.{js,json,es6}'],
  lib:  ['lib/**/*.{js,es6}'],
  test: ['test/**/*.{js,es6}'],
}
paths.all = _(paths).values().flatten().value()

gulp.task('files', () => {
  return gulp.src(paths.all)
        .pipe(gprint())
})

gulp.task('lint', () => {
  return gulp.src(paths.all)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
})

gulp.task('mocha', () => {
  return gulp.src([...paths.lib, ...paths.test], {read: false})
        .pipe(mocha({ reporter: 'dot' }))
})

gulp.task('test', ['lint', 'mocha'])

gulp.task('watch-test', () => {
  gulp.watch(paths.all, ['lint', 'test'])
})

gulp.task('default', ['test'])
