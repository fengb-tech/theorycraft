module.exports = {
  entry: `${__dirname}/lib/assets/js/tc.js`,
  externals: {
    riot: 'riot',
    lodash: '_',
    eventemitter3: 'PIXI.utils.EventEmitter',
    'pixi.js': 'PIXI',
    'pixi-spine': 'PIXI.spine'
  },
  output: {
    path: `${__dirname}/public/assets`,
    filename: 'tc.js'
  },
  module: {
    preLoaders: [
      { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs?type=es6' }
    ],
    loaders: [
      { test: /\.(js|tag)$/, exclude: /node_modules/, loader: 'babel?externalHelpers' }
    ]
  },
  resolve: {
    modulesDirectories: [],
    fallback: __dirname
  }
}
