const EventEmitter = require('eventemitter3')

const FULL_HP = 10000

module.exports = class State extends EventEmitter {
  constructor (chars) {
    super()

    this.hps = {}

    for (let char of chars) {
      this.hps[char] = FULL_HP
    }
  }

  process (directive) {
    switch (directive.action) {
      case 'attack':
        this.hps[directive.target] -= directive.damage
        this.emit(`hp.${directive.target}`)
        this.emit('change')
        break
      case 'recover':
        this.hps[directive.target] = FULL_HP
        this.emit(`hp.${directive.target}`)
        this.emit('change')
        break
    }
  }

  isAlive (char) {
    return this.hps[char] > 0
  }

  kill (char) {
    this.hps[char] = 0
  }
}
