'use strict'

require('babel/register')

const gulp = {
  core: require('gulp'),
  loadTasks(name){
    require(`tc/lib/gulp/${name}`)
  }
}

gulp.loadTasks('assets')
gulp.loadTasks('test')

gulp.core.task('watch', ['watch:assets', 'watch:test'])

gulp.core.task('default', ['assets', 'test'])
