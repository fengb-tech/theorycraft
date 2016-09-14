const APP_ROOT = require('app-root-path')
const koa = require('koa')
const logger = require('koa-logger')
const serve = require('koa-static')

const router = require('./router')

module.exports =
  koa()
    .use(logger())
    .use(router.routes())
    .use(serve(`${APP_ROOT}/public`))
