let Router = require('koa-router')
let render = require('./render')
let appRoot = require('app-root-path')

var router =
  new Router()
    .get('/',      render.wrap().markdown(appRoot + '/README.md'))
    .get('/tc.js', render.browserify(appRoot + '/lib/client/tc.js'))

module.exports = router.routes()
