exports.now = (() => {
  if(typeof(performance) === 'object' && typeof(performance.now) === 'function' &&
     typeof(performance.timing) === 'object' && performance.timing.navigationStart) {
    return () => performance.timing.navigationStart + performance.now()
  }

  return Date.now
})()
