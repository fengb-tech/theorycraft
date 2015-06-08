const APP_ROOT = require('app-root-path')
const koa = require('koa')
const bundle = require('./bundle')
const serve = require('koa-static')

module.exports =
  koa()
    .use(require('./logger'))
    .use(require('./routes'))
    .use(bundle.browserify('tc.js'))
    .use(serve(APP_ROOT + '/public'))
