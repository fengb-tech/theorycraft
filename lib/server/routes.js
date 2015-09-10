const APP_ROOT = require('app-root-path')
const Router = require('koa-router')
const render = require('./render')

module.exports =
  new Router()
    .get('/',      render.view('home.jade'))
    .get('/about', render.wrap(render.markdown(`${APP_ROOT}/README.md`)))
    .routes()
