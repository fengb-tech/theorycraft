let Router = require('koa-router')
let render = require('./render')
let appRoot = require('app-root-path')

var router =
  new Router()
    .get('/',      render.view('home.jade'))
    .get('/about', render.wrap().markdown(appRoot + '/README.md'))

module.exports = router.routes()
