const appRoot = require('app-root-path')
const bundle = require('koa-bundle')
const browserify = require('browserify')
const babelify = require('babelify')
const reactJade = require('react-jade')

const CONFIG = Object.freeze({
  root: appRoot + '/lib/client',
  debug: true,
})

exports.browserify = bundle(CONFIG, (file, next) => {
  browserify({ debug: file.debug })
    .add(file.path)
    .transform(babelify)
    .transform(reactJade)
    .bundle(next)
})
