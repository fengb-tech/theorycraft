import koa from 'koa'
import logger from 'koa-logger'
import router from './router'

var app = koa()
export default app

app.use(logger())
app.use(router.routes())
