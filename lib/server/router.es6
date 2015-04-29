import Router from 'koa-router'
import * as render from './render'

var router = new Router()
export default router

router.get('/', render.markdownFile('README.md'))
