const util = require('util')

function zeroPad (length, value) {
  let valueStr = value.toString()
  while (valueStr.length < length) {
    valueStr = '0' + valueStr
  }
  return valueStr
}

function humanResultLine (combat, directive) {
  let date = new Date(directive.time)
  let timeStr = util.format('%s:%s:%s.%s',
    zeroPad(2, date.getHours()),
    zeroPad(2, date.getMinutes()),
    zeroPad(2, date.getSeconds()),
    Math.floor(date.getMilliseconds() / 100)
  )
  switch (directive.action) {
    case 'attack':
      let action = directive.source === combat.hero ? 'attack' : 'defend'
      let damage = directive.damage || 'miss'
      if (directive.isCrit) {
        damage += '**'
      }
      return `${timeStr} - ${action}: ${damage}`
    case 'recover':
      return `${timeStr} - mending wounds`
    case 'end':
      return `${timeStr} - ---`
    default:
      return `${timeStr} - ???`
  }
}

module.exports = class Combat {
  constructor ({ console }) {
    this.console = console
  }

  syncTo (targetTime) {
    while (targetTime > this.nextTime()) {
      let directive = this._combat.result[this._next++]
      this.console.push(humanResultLine(this._combat, directive))
    }
  }

  isDone () {
    return this.nextTime() == null
  }

  nextTime () {
    if (!this._combat) {
      return null
    }

    let directive = this._combat.result[this._next]
    return (directive && directive.time) || null
  }

  get combat () {
    return this._combat
  }
  set combat (combat) {
    this._next = 0
    this._combat = combat
  }
}
