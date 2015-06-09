const _ = require('lodash')
const isparta = require('isparta')

const gulp = {
  core:        require('gulp'),
  jshint:      require('gulp-jshint'),
  mocha:       require('gulp-mocha'),
  istanbul:    require('gulp-istanbul'),
  plumber:     require('gulp-plumber'),
  runSequence: require('run-sequence'),
}

const PATH = {
  meta:    ['.jshintrc', '*.{js,json}'],
  lib:     ['lib/**/*.js'],
  test:    ['test/**/*.js'],
  profile: ['profile/**/*.js'],
}
PATH.all = _(PATH).values().flatten().value()

module.exports = function(base){
  gulp.core.task(`${base}:lint`, () =>
    gulp.core.src(PATH.all)
      .pipe(gulp.jshint())
      .pipe(gulp.jshint.reporter('default'))
  )

  gulp.core.task(`${base}:coverage-init`, () =>
    gulp.core.src(PATH.lib)
      .pipe(gulp.istanbul({ instrumenter: isparta.Instrumenter }))
      .pipe(gulp.istanbul.hookRequire())
  )

  gulp.core.task(`${base}:mocha-coverage`, [`${base}:coverage-init`], () =>
    gulp.core.src(PATH.test)
      .pipe(gulp.plumber())
      .pipe(gulp.mocha({ reporter: 'dot' }))
      .pipe(gulp.istanbul.writeReports({ reporters: ['lcov'] }))
  )

  gulp.core.task(`${base}:mocha`, (done) => {
    if(process.env.TC_COVERAGE){
      gulp.runSequence(`${base}:mocha-coverage`, done)
    } else {
      return gulp.core.src(PATH.test)
        .pipe(gulp.mocha({ reporter: 'dot' }))
    }
  })

  gulp.core.task(`${base}`, (done) => {
    gulp.runSequence(`${base}:lint`, `${base}:mocha`, done)
  })

  gulp.core.task(`${base}:watch`, () => {
    gulp.core.watch(PATH.all, [base])
  })
}
