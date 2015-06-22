require('babel/register')

if(process.env.NODE_PATH){
  process.env.NODE_PATH += `:${__dirname}`
} else {
  process.env.NODE_PATH = __dirname
}
require('module')._initPaths()
