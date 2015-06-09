const gulp = require('gulp')

exports.taskWithWatch = (name, files, ...args) => {
  gulp.task(name, ...args)

  gulp.task(`watch:${name}`, () =>
    gulp.watch(files, [name])
  )
}
