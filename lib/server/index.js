let koa = require('koa')

module.exports =
  koa()
    .use(require('./logger'))
    .use(require('./routes'))
