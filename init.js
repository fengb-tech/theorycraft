require('babel-core/register')({
  whitelist: [
    'strict',             // Block-scoped declarations (let, const, function, class) not yet supported outside strict mode
    'es6.destructuring',  // Unexpected token {
    'es6.parameters',     // Unexpected token =
    'es6.spread',         // Unexpected token ...
    'es6.arrowFunctions', // Node has issues with arrow spread (...args) =>

    // Optimization-killers: https://github.com/petkaantonov/bluebird/wiki/Optimization-killers
    'regenerator',        // generators
    'es6.classes',        // needed for regenerator + generator methods
    'es6.forOf',          // Functions that contain a for-of statement
  ],
})

;(function addLocalDirToLoadPath () {
  if (process.env.NODE_PATH) {
    process.env.NODE_PATH += `:${__dirname}`
  } else {
    process.env.NODE_PATH = __dirname
  }
  require('module')._initPaths()
})()

;(function shimGlobals () {
  global.Promise = require('bluebird')
})()
