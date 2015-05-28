let appRoot = require('app-root-path')
let views = require('co-views')

module.exports = views(appRoot + '/lib/views')
