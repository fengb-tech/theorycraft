exports.timeout = function* timeout(maxDurationMs, iterable){
  let startMs = new Date().valueOf()

  for(let val of iterable){
    let duration = new Date() - startMs
    if(duration > maxDurationMs){
      throw new RangeError(`Timeout: ${duration}ms`)
    }

    yield val
  }
}
