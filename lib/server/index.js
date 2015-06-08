const koa = require('koa')
const bundle = require('./bundle')
const serve = require('koa-static')
const appRoot = require('app-root-path')

module.exports =
  koa()
    .use(require('./logger'))
    .use(require('./routes'))
    .use(bundle.browserify('tc.js'))
    .use(serve(appRoot + '/public'))
