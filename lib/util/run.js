exports.in = function(duration, callback){
  return setTimeout(callback, duration)
}

exports.every = function(duration, callback){
  return setInterval(callback, duration)
}

exports.clear = clearTimeout.bind(this)
exports.clearEvery = clearInterval.bind(this)

exports.at = function(time, callback){
  let now = new Date()
  return setTimeout(callback, time - now)
}
