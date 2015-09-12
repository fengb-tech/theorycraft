const time = require('lib/util/time')

exports.timeoutMs = function * timeoutMs (maxDurationMs, iterable) {
  let startMs = time.now()

  for (let val of iterable) {
    let duration = time.now() - startMs
    if (duration > maxDurationMs) {
      throw new RangeError(`Timeout: ${duration}ms`)
    }

    yield val
  }
}

exports.timeoutIters = function * timeoutIters (maxIters, iterable) {
  let iters = 0

  for (let val of iterable) {
    if (++iters > maxIters) {
      throw new RangeError(`Timeout: ${maxIters} iterations`)
    }

    yield val
  }
}
