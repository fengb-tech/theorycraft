var _ = require('lodash')
var webpack = require('webpack')

var MODULES = /\bnode_modules\b/

var VENDOR = {
  'browser-polyfill': `${__dirname}/node_modules/babel-core/browser-polyfill.js`,
  'external-helpers': `${__dirname}/node_modules/babel-core/external-helpers.js`,
  riot: `${__dirname}/node_modules/riot/riot.js`,
  lodash: `${__dirname}/node_modules/lodash/lodash.js`,
  'pixi.js': `${__dirname}/node_modules/pixi.js/dist/pixi.js`,
  'pixi-spine': `${__dirname}/node_modules/pixi-spine/bin/pixi-spine.js`,
  eventemitter3: `${__dirname}/node_modules/eventemitter3/index.js`,
  bluebird: `${__dirname}/node_modules/bluebird/js/browser/bluebird.js`
}

module.exports = {
  entry: {
    tc: `${__dirname}/lib/assets/js/tc.js`,
    vendor: _.values(VENDOR)
  },
  output: {
    path: `${__dirname}/public/assets`,
    filename: '[name].js'
  },
  module: {
    noParse: _.values(VENDOR),
    rules: [
      { test: /\.tag$/, enforce: 'pre', exclude: MODULES, loader: 'riotjs-loader?type=es6!imports-loader?riot=riot' },
      { test: /\.(js|tag)$/, exclude: MODULES, loader: 'babel-loader?externalHelpers' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' })
  ],
  resolve: {
    modules: [__dirname],
    alias: VENDOR
  }
}
