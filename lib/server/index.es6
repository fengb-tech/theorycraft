import koa from 'koa'

var app = koa()
export default app

// logger

app.use(function *(next){
  var start = new Date()
  yield next
  var ms = new Date() - start
  console.log('%s %s - %s', this.method, this.url, ms)
})

// response

app.use(function *(){
  /* jshint noyield:true */
  this.body = 'Hello World'
})
