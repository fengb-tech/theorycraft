const time = require('lib/util/time')

const run = exports

run.in = (duration, callback) => setTimeout(callback, duration)

run.every = function(duration, callback){
  let id = setInterval(() => {
    let response = callback()
    if(response === false){
      run.clearEvery(id)
    }
  }, duration)
  return id
}

run.everyFrame = (() => {
  if(typeof(requestAnimationFrame) === 'function'){
    return (callback) =>
      requestAnimationFrame(function loop(time){
        let response = callback(time)
        if(response !== false){
          requestAnimationFrame(loop)
        }
      })
  }

  return (callback) => run.every(16, callback)
})()

run.clear = clearTimeout.bind(this)
run.clearEvery = clearInterval.bind(this)

run.at = (targetTime, callback) => setTimeout(callback, targetTime - time.now())
