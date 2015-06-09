const gulp = {
  core:   require('gulp'),
  concat: require('gulp-concat'),
}

const PATH = {
  output:  'public/assets',
}

module.exports = function(base){
  gulp.core.task(`${base}:vendor.js`, () =>
    gulp.core.src(['bower_components/react/react.js'])
      .pipe(gulp.concat('vendor.js', { newLine: ';' }))
      .pipe(gulp.core.dest(PATH.output))
  )

  gulp.core.task(`${base}:watch:vendor.js`, () =>
    gulp.core.watch('bower_components/react/react.js', [`${base}:vendor.js`])
  )

  gulp.core.task(`${base}`, [`${base}:vendor.js`])

  gulp.core.task(`${base}:watch`, [`${base}:watch:vendor.js`])
}
