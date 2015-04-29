import gulp from 'gulp'
import mocha from 'gulp-mocha'

gulp.task('test', () => {
  return gulp.src('test/**.{js,es6}', {read: false})
        .pipe(mocha())
})

gulp.task('default', ['test'])
