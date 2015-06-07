exports.series = function(funcs){
  return function(...args){
    let ret
    for(let func of funcs){
      if(func != null){
        ret = func.apply(this, args)
      }
    }
    return ret
  }
}
