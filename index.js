require('./init')

var server = require('lib/server')

var port = Number(process.env.PORT || 5000)

server.listen(port, function(){
  console.log('tc started on', port)
})
