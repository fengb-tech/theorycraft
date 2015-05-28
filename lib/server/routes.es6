let Router = require('koa-router')
let render = require('./render')

var router =
  new Router()
    .get('/', render.markdownFile('README.md'))

module.exports = router.routes()
