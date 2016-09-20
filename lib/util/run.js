const _ = require('lodash')
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

run.debounce = (duration, callback) => _.debounce(callback, duration)

if (typeof global.requestAnimationFrame === 'function') {
  let raf = global.requestAnimationFrame
  let stopRafPids = {}

  run.nextFrame = (callback) => raf(callback)
  run.clearEveryFrame = (originalPid) => { stopRafPids[originalPid] = true }
  run.everyFrame = function (callback) {
    let originalPid = raf(function loop (time) {
      let response = callback(time)
      if (!stopRafPids[originalPid] && response !== false) {
        raf(loop)
      }
    })
    return originalPid
  }
} else {
  run.nextFrame = (callback) => run.in(1, callback)
  run.everyFrame = (callback) => run.every(16, callback)
  run.clearEveryFrame = run.clearEvery
}
