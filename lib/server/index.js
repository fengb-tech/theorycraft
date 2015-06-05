const koa = require('koa')
const bundle = require('./bundle')

module.exports =
  koa()
    .use(require('./logger'))
    .use(require('./routes'))
    .use(bundle.browserify('tc.js'))
