import MarkdownIt from 'markdown-it'
import fs from 'mz/fs'

var markdown = new MarkdownIt()

export function markdownFile(filename, options = {}){
  return function *(next){
    let content = yield fs.readFile(filename, 'utf8')
    this.body = markdown.render(content)
  }
}
