const gulp = {
  core: require('gulp'),
  sass: require('gulp-sass'),
  helper: require('./helper')
}

const PATH = {
  dest: 'public/assets',
  sass: ['lib/assets/css/**/*.scss']
}

gulp.helper.taskWithWatch('assets:css', PATH.sass, () =>
  gulp.core.src(PATH.sass)
    .pipe(gulp.sass().on('error', gulp.sass.logError))
    .pipe(gulp.core.dest(PATH.dest))
)

gulp.core.task('assets', ['assets:css'])

gulp.core.task('watch:assets', ['watch:assets:css'])
