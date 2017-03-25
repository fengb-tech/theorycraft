const APP_ROOT = require('app-root-path')
const mzFs = require('mz/fs')

const markdown = require('markdown-it')()
const cons = require('consolidate')

const VIEWS = `${APP_ROOT}/lib/views`

module.exports = {
  view (filename, options = {}) {
    return async (ctx, _next) => {
      ctx.body = await cons.pug(`${VIEWS}/${filename}`, options)
    }
  },
  markdown (filename, _options) {
    return async (ctx, _next) => {
      let file = await mzFs.readFile(filename, 'utf8')
      let wrapped = markdown.render(file)
      ctx.body = await cons.pug(`${VIEWS}/wrapper.pug`, { wrapped })
    }
  }
}
