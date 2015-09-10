require('babel/register')({
  whitelist: [
    'strict',             // Block-scoped declarations (let, const, function, class) not yet supported outside strict mode
    'es6.destructuring',  // Unexpected token {
    'es6.parameters',     // Unexpected token =
    'es6.spread',         // Unexpected token ...
    'es6.arrowFunctions', // Node still has issues with arrow spread (...args) =>
  ]
})

if(process.env.NODE_PATH){
  process.env.NODE_PATH += `:${__dirname}`
} else {
  process.env.NODE_PATH = __dirname
}
require('module')._initPaths()
