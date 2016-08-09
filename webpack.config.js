module.exports = {
  entry: './lib/assets/js/tc.js',
  externals: {
    react: 'React',
    lodash: '_',
    eventemitter3: 'EventEmitter',
    'pixi.js': 'PIXI',
    'pixi-spine': 'PIXI.spine',
  },
  output: {
    path: './public/assets',
    filename: 'tc.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },
  resolve: {
    modulesDirectories: [],
    fallback: __dirname,
  }
}
