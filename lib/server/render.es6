let fs = require('mz/fs')
let markdown = new require('markdown-it')()

exports.markdownFile = function markdownFile(filename, options = {}){
  return function *(next){
    let content = yield fs.readFile(filename, 'utf8')
    this.body = markdown.render(content)
  }
}
