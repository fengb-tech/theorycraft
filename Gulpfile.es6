import gulp from 'gulp'
import jshint from 'gulp-jshint'
import mocha from 'gulp-mocha'

let paths = {
  meta: ['.jshintrc', '*.{js,json,es6}'],
  src:  ['src/**.{js,es6}'],
  test: ['test/**.{js,es6}'],
}

gulp.task('lint', () => {
  return gulp.src([...paths.meta, ...paths.src, ...paths.test])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
})

gulp.task('mocha', () => {
  return gulp.src([...paths.src, ...paths.test], {read: false})
        .pipe(mocha())
})

gulp.task('test', ['lint', 'mocha'])

gulp.task('default', ['test'])
