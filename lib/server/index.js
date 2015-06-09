const APP_ROOT = require('app-root-path')
const koa = require('koa')
const serve = require('koa-static')

module.exports =
  koa()
    .use(require('./logger'))
    .use(require('./routes'))
    .use(serve(APP_ROOT + '/public'))
