const EventEmitter = require('eventemitter3')

const FULL_HP = 10000

module.exports = class Simulation extends EventEmitter {
  constructor (chars) {
    super()

    this.hps = {}

    for (let char of chars) {
      this.hps[char] = FULL_HP
    }
  }

  process (action) {
    switch (action.type) {
      case 'attack':
        this.hps[action.target] -= action.damage
        this.emit(`hp.${action.target}`)
        if (this.hps[action.target] <= 0) {
          this.emit('death', action.target)
        }
        break
      case 'recover':
        this.hps[action.target] = FULL_HP
        this.emit(`hp.${action.target}`)
        break
    }

    this.emit('action', action)
    this.emit('change')
  }

  isAlive (char) {
    return this.hps[char] > 0
  }

  kill (char) {
    this.hps[char] = 0
    this.emit('death', char)
  }
}
