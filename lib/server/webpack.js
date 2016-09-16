const APP_ROOT = require('app-root-path')
const requireOptional = require('require-optional')
const webpackDevServer = requireOptional('koa-webpack-dev')

module.exports = webpackDevServer && webpackDevServer({
  config: `${APP_ROOT}/webpack.config.js`
})
