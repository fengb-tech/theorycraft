const APP_ROOT = require('app-root-path')
const koa = require('koa')
const logger = require('koa-logger')
const serve = require('koa-static')

const webpack = require('./webpack')
const router = require('./router')

function * noop (next) {
  yield * noop
}

module.exports =
  koa()
    .use(logger())
    .use(webpack || noop)
    .use(router.routes())
    .use(serve(`${APP_ROOT}/public`))
