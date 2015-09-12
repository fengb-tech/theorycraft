const co = require('co')
const renderView = require('./view')

module.exports = function (wrapped) {
  return function * () {
    yield co(wrapped.bind(this))

    let options = { wrapped: this.body }
    yield co(renderView('wrapper.jade', options).bind(this))
  }
}
