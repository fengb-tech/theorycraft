module.exports = {
  entry: `${__dirname}/lib/assets/js/tc.js`,
  externals: {
    riot: 'riot',
    lodash: '_',
    eventemitter3: 'EventEmitter',
    'pixi.js': 'PIXI',
    'pixi-spine': 'PIXI.spine'
  },
  output: {
    path: `${__dirname}/public/assets`,
    filename: 'tc.js'
  },
  module: {
    preLoaders: [
      { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'es6' } }
    ],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: { externalHelpers: true }
    }]
  },
  resolve: {
    modulesDirectories: [],
    fallback: __dirname
  }
}
