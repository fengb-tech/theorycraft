const fs = require('mz/fs')
const markdown = require('markdown-it')()

module.exports = function (filename, _options = {}) {
  return function * (_next) {
    let file = yield fs.readFile(filename, 'utf8')
    this.body = markdown.render(file)
  }
}
