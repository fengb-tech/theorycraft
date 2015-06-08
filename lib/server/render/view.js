const APP_ROOT = require('app-root-path')
let views = require('co-views')

let view = views(`${APP_ROOT}/lib/views`)

module.exports = function(file, options = {}){
  return function*(next){
    this.body = yield view(file, options)
  }
}
