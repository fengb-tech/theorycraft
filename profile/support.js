require('../init')

var ITERS = 1000000

exports.profile = function(callback){
  var start = Date.now()
  for(var i = 0; i < ITERS; i++){
    callback()
  }
  var end = Date.now()
  console.log(`${ITERS / (end - start)} iterations per sec`)
}
