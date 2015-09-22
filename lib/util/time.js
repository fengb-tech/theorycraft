const _ = require('lodash')

const MULTIPLIERS = {
  day: 8640000,
  hr:   360000,
  min:   60000,
  sec:    1000,
  ms:        1,
  µs:        0.001,  // Gratuitous use of unicode
}

let time = module.exports = (options) => {
  let total = 0
  for (let key in options) {
    total += MULTIPLIERS[key] * options[key]
  }
  return total
}

time.localNow = (() => {
  let start = _.get(global, 'performance.timing.navigationStart')
  if (start) {
    /* global performance */
    return () => (start + performance.now())
  }

  return Date.now
})()

let nowOffset = 0
time.resetNow = () => { nowOffset = 0 }
time.setNow = (targetNow, localNow = time.localNow()) => {
  nowOffset = targetNow - localNow
}

time.now = () => (nowOffset + time.localNow())
