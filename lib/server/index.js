const APP_ROOT = require('app-root-path')
const Koa = require('koa')
const logger = require('koa-logger')
const views = require('koa-views')
const serve = require('koa-static')

const router = require('./router')

module.exports =
  new Koa()
    .use(logger())
    .use(views(`${APP_ROOT}/lib/views`))
    .use(router.routes())
    .use(serve(`${APP_ROOT}/public`))
