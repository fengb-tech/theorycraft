const time = require('lib/util/time')

exports.timeout = function* timeout(maxDurationMs, iterable){
  let startMs = time.now()

  for(let val of iterable){
    let duration = time.now() - startMs
    if(duration > maxDurationMs){
      throw new RangeError(`Timeout: ${duration}ms`)
    }

    yield val
  }
}
