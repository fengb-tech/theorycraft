const APP_ROOT = require('app-root-path')
const view = require('co-views')(`${APP_ROOT}/lib/views`)

module.exports = function(file, options = {}){
  return function*(next){
    this.body = yield view(file, options)
  }
}
