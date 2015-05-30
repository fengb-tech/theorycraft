let renderView = require('./view')
let co = require('co')

module.exports = function(options = {}){
  return function*(next){
    yield next
    options.content = this.body
    this.body = yield renderView.raw('wrapper.jade', options)
  }
}
