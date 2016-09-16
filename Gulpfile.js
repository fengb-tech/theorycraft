require('./init')

var gulp = {
  loadTasks (name) {
    require(`lib/gulp/${name}`)
  }
}

gulp.loadTasks('assets')
