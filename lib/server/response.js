const APP_ROOT = require('app-root-path')
const mzFs = require('mz/fs')

const markdown = require('markdown-it')()
const view = require('co-views')(`${APP_ROOT}/lib/views`)

module.exports = {
  view (filename, options = {}) {
    return function * (_next) {
      this.body = yield view(filename, options)
    }
  },
  markdown (filename, _options) {
    return function * (_next) {
      let file = yield mzFs.readFile(filename, 'utf8')
      let wrapped = markdown.render(file)
      this.body = yield view('wrapper.jade', { wrapped })
    }
  },
}
