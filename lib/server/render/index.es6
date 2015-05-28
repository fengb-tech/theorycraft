let _ = require('lodash')
let fs = require('mz/fs')
let markdown = new require('markdown-it')()
let view = require('./view')

exports.template = function template(view){
  return function*(next){
    this.body = yield view(template)
  }
}

exports.markdownFile = function markdownFile(filename, options = {}){
  return function*(next){
    let file = yield fs.readFile(filename, 'utf8')
    this.body = yield view('wrapper.jade', _.defaults(options, {
      content: markdown.render(file)
    }))
  }
}
