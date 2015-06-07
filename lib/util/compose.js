const _ = require('lodash')

exports.series = function(funcs){
  funcs = _.compact(funcs)

  if(funcs.length <= 1){
    return funcs[0]
  }

  return function(...args){
    let ret
    for(let func of funcs){
      ret = func.apply(this, args)
    }
    return ret
  }
}
