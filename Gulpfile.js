require('./init')

var gulp = {
  core: require('gulp'),
  loadTasks (name) {
    require(`lib/gulp/${name}`)
  }
}

gulp.loadTasks('assets')

gulp.core.task('default', ['assets', 'test'])
