const gulp = {
  core:   require('gulp'),
  concat: require('gulp-concat'),
  helper: require('./helper'),
}

const PATH = {
  output:  'public/assets',
  vendor:  ['bower_components/react/react.js'],
}

gulp.helper.taskWithWatch('assets:vendor.js', PATH.vendor, () =>
  gulp.core.src(PATH.vendor)
    .pipe(gulp.concat('vendor.js', { newLine: ';' }))
    .pipe(gulp.core.dest(PATH.output))
)

gulp.core.task('assets', ['assets:vendor.js'])

gulp.core.task('watch:assets', ['watch:assets:vendor.js'])
