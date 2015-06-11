exports.in = function(duration, callback){
  setTimeout(callback, duration)
}

exports.every = function(duration, callback){
  setInterval(callback, duration)
}

exports.clear = clearTimeout.bind(this)
exports.clearEvery = clearInterval.bind(this)

exports.at = function(time, callback){
  let now = new Date()
  setTimeout(callback, time - now)
}
