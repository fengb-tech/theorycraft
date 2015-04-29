import koa from 'koa'
import router from './router'

var app = koa()
export default app

// logger

app.use(function *(next){
  var start = new Date()
  yield next
  var ms = new Date() - start
  console.log('%s %s - %s', this.method, this.url, ms)
})

app.use(router.routes())
