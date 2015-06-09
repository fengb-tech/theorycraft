const gulp = require('gulp')

exports.taskWithWatch = (name, files, taskDefinition) => {
  gulp.task(name, taskDefinition)

  gulp.task(`watch:${name}`, () =>
    gulp.watch(files, [name])
  )
}
