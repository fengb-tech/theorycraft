const lint = require('mocha-eslint')

lint([
  '*.js',
  '{lib,test,profile}/**/*.js',
])
