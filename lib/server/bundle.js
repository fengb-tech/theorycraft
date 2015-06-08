const APP_ROOT = require('app-root-path')
const bundle = require('koa-bundle')
const browserify = require('browserify')
const babelify = require('babelify')
const reactJade = require('react-jade')

const CONFIG = Object.freeze({
  root: `${APP_ROOT}/lib/client`,
  debug: true,
})

exports.browserify = bundle(CONFIG, (file, next) => {
  browserify({ debug: file.debug })
    .add(file.path)
    .transform(reactJade)
    .transform(babelify)
    .bundle(next)
})
