const _ = require('lodash')
const EventEmitter = require('eventemitter3')

exports.circularBuffer = (() => {
  let overrideMethods = _.clone(EventEmitter.prototype)
  _.each(['push', 'pop', 'unshift', 'shift', 'reverse', 'sort', 'copyWithin', 'fill', 'splice'], (name) => {
    let arrayMethod = Array.prototype[name]
    overrideMethods[name] = function (...args) {
      let ret = arrayMethod.apply(this, args)
      this.emit(name, ...args)
      if (this.length > this.size) {
        this.splice(0, this.length - this.size)
      }
      this.emit('change')
      return ret
    }
  })

  return (size, array = []) => {
    if (size == null) {
      throw new TypeError('Size required!')
    }

    if (!(array instanceof Array)) {
      throw new TypeError('Must be of type Array')
    }

    array = _.clone(array)
    array.size = size

    return _.mixin(array, overrideMethods)
  }
})()
