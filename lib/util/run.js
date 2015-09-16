const time = require('lib/util/time')

const run = exports

run.in = (duration, callback) => setTimeout(callback, duration)
run.at = (targetTime, callback) => setTimeout(callback, targetTime - time.now())
run.clear = (pid) => clearTimeout(pid)

run.every = function (duration, callback) {
  let pid = setInterval(() => {
    let response = callback()
    if (response === false) {
      run.clearEvery(pid)
    }
  }, duration)
  return pid
}

run.clearEvery = (pid) => clearInterval(pid)

if (typeof requestAnimationFrame === 'function') {
  /* global requestAnimationFrame */
  run.nextFrame = (callback) => requestAnimationFrame(callback)
  let stopRafPids = {}
  run.clearEveryFrame = (pid) => (stopRafPids[pid] = true)
  run.everyFrame = function (callback) {
    let pid = requestAnimationFrame(function loop (time) {
      let response = callback(time)
      if (!stopRafPids[pid] && response !== false) {
        requestAnimationFrame(loop)
      }
    })
  }
} else {
  run.nextFrame = (callback) => run.in(1, callback)
  run.everyFrame = (callback) => run.every(16, callback)
  run.clearEveryFrame = run.clearEvery
}
