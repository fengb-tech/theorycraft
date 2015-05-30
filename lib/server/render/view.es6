let appRoot = require('app-root-path')
let views = require('co-views')

let view = views(appRoot + '/lib/views')

module.exports = function(file, options = {}){
  return function*(next){
    this.body = yield view(file, options)
  }
}

module.exports.raw = view
