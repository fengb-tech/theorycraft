const APP_ROOT = require('app-root-path')
let Router = require('koa-router')
let render = require('./render')

var router =
  new Router()
    .get('/',      render.view('home.jade'))
    .get('/about', render.wrap().markdown(`${APP_ROOT}/README.md`))

module.exports = router.routes()
