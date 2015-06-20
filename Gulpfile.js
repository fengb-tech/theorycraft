require('./env')
require('babel/register')

var gulp = {
  core: require('gulp'),
  loadTasks: function(name){
    require(`lib/gulp/${name}`)
  }
}

gulp.loadTasks('assets')
gulp.loadTasks('test')

gulp.core.task('watch', ['watch:assets', 'watch:test'])

gulp.core.task('default', ['assets', 'test'])
