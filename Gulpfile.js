'use strict'

require('babel/register')

const gulp = {
  core: require('gulp'),
  tasksFor(namespace, module){
    module(namespace)
  }
}

gulp.tasksFor('test', require('tc/lib/gulp/test'))
gulp.tasksFor('assets', require('tc/lib/gulp/assets'))

gulp.core.task('watch', ['test:watch'])

gulp.core.task('default', ['test'])
