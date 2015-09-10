require('babel/register')({
  blacklist: [
    'es6.classes',
    'es6.forOf',
    'es6.objectSuper',
    'es6.properties.computed',
    'es6.properties.shorthand',
    'es6.spec.symbols',
    'regenerator',
  ]
})

if(process.env.NODE_PATH){
  process.env.NODE_PATH += `:${__dirname}`
} else {
  process.env.NODE_PATH = __dirname
}
require('module')._initPaths()
