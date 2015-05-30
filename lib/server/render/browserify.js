let c2k = require('koa-connect')
let browserify = require('browserify-middleware')
let babelify = require('babelify')

browserify.settings({
  transform: [babelify],
  extensions: ['.js', '.es6']
})

module.exports = (...args) => c2k(browserify(...args))
