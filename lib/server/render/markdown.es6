let fs = require('mz/fs')
let markdown = new require('markdown-it')()

module.exports = function(filename, options = {}){
  return function*(next){
    let file = yield fs.readFile(filename, 'utf8')
    this.body = markdown.render(file)
  }
}
