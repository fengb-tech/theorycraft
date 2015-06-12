const isparta = require('isparta')

const gulp = {
  core:        require('gulp'),
  jshint:      require('gulp-jshint'),
  mocha:       require('gulp-mocha'),
  istanbul:    require('gulp-istanbul'),
  plumber:     require('gulp-plumber'),
  helper:      require('./helper'),
}

const PATH = {
  lib:   ['lib/**/*.js'],
  test:  ['test/**/*.js'],
  lint:  ['.jshintrc', '*.{js,json}', '{lib,test,profile}/**/*.js'],
  mocha: ['{lib,test}/**/*.js', '!lib/assets/**/*'],
}

gulp.helper.taskWithWatch('test:lint', PATH.lint, () =>
  gulp.core.src(PATH.lint)
    .pipe(gulp.jshint())
    .pipe(gulp.jshint.reporter('default'))
)

gulp.core.task('test:coverage-init', () =>
  gulp.core.src(PATH.lib)
    .pipe(gulp.istanbul({ instrumenter: isparta.Instrumenter }))
    .pipe(gulp.istanbul.hookRequire())
)

gulp.core.task('test:mocha-coverage', ['test:coverage-init'], () =>
  gulp.core.src(PATH.test, { read: false })
    .pipe(gulp.plumber())
    .pipe(gulp.mocha({ reporter: 'dot' }))
    .pipe(gulp.istanbul.writeReports({ reporters: ['lcov'] }))
)

gulp.core.task('test:mocha-nocoverage', () =>
  gulp.core.src(PATH.mocha, { read: false })
    .pipe(gulp.mocha({ reporter: 'dot' }))
)

const mochaTask = process.env.TC_COVERAGE ? 'test:mocha-coverage' : 'test:mocha-nocoverage'
gulp.helper.taskWithWatch('test:mocha', PATH.mocha, [mochaTask])

gulp.core.task('test', ['test:lint', 'test:mocha'])
gulp.core.task('watch:test', ['watch:test:lint', 'watch:test:mocha'])
