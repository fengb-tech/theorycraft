require('./env')

const server = require('lib/server')

const port = Number(process.env.PORT || 5000)

server.listen(port, () => {
  console.log('tc started on', port)
})
