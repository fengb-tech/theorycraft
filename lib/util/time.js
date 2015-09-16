let time = exports

time.localNow = (() => {
  /* global performance */
  if (typeof performance === 'object' &&
      typeof performance.now === 'function' &&
      typeof performance.timing === 'object' &&
      performance.timing.navigationStart) {
    return () => (performance.timing.navigationStart + performance.now())
  }

  return Date.now
})()

let nowOffset = 0
time.resetNow = () => { nowOffset = 0 }
time.setNow = (targetNow, localNow = time.localNow()) => {
  nowOffset = targetNow - localNow
}

time.now = () => (nowOffset + time.localNow())
