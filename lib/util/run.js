const compose = require('./compose')

exports.in = function(duration, callback){
  return setTimeout(callback, duration)
}

exports.every = function(duration, callback){
  return setInterval(callback, duration)
}

exports.everyFrame = function(callback){
  requestAnimationFrame(function loop(time){
    let response = callback(time)
    if(response !== false){
      requestAnimationFrame(loop)
    }
  })
}

exports.clear = clearTimeout.bind(this)
exports.clearEvery = clearInterval.bind(this)

exports.at = function(time, callback){
  let now = new Date()
  return setTimeout(callback, time - now)
}
