const util = require('util')

const CombatCore = require('lib/core/combat')
const run = require('lib/util/run')
const time = require('lib/util/time')
const eventable = require('lib/util/eventable')

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

const TRAVEL_TIME = 5000

module.exports = class Combat {
  constructor (hero) {
    this.hero = hero
    this.console = eventable.circularBuffer(100)
  }

  startAutoSync () {
    this._autoSyncing = true
    this._scheduleAutoSync()
  }

  stopAutoSync () {
    this._autoSyncing = false
    if (this.nextSync) {
      run.clear(this.nextSync)
      this.nextSync = null
    }
  }

  syncTo (targetTime) {
    while (targetTime > this.nextTime()) {
      let directive = this._combat.result[this._next++]
      this.console.push(humanResultLine(this._combat, directive))
    }
  }

  fetchCombat () {
    this.combat = CombatCore.run(this.hero)
  }

  _scheduleAutoSync () {
    if (this.nextSync) {
      run.clear(this.nextSync)
      this.nextSync = null
    }

    if (this.isDone()) {
      run.in(TRAVEL_TIME, () => this.fetchCombat())
    } else {
      run.at(this.nextTime(), () => {
        let now = time.now()
        this.syncTo(now)
        this._scheduleAutoSync()
      })
    }
  }

  isDone () {
    return this.nextTime() == null
  }

  nextTime () {
    if (!this._combat) {
      return
    }

    let directive = this._combat.result[this._next]
    return directive && directive.time
  }

  get combat () {
    return this._combat
  }
  set combat (combat) {
    this._next = 0
    this._combat = combat
    if (this._autoSyncing) {
      this._scheduleAutoSync()
    }
  }
}
