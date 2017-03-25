const APP_ROOT = require('app-root-path')
const Router = require('koa-router')

const response = require('./response')

module.exports =
  new Router()
    .get('/', response.view('home.pug'))
    .get('/about', response.markdown(`${APP_ROOT}/README.md`))
