const EventEmitter = require('eventemitter3')

const CombatCore = require('lib/core/combat')
const CombatState = require('lib/core/combat/state')
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

function humanTime (timeValue = time.now()) {
  let date = new Date(timeValue)
  return zeroPad(2, date.getHours()) + ':' +
         zeroPad(2, date.getMinutes()) + ':' +
         zeroPad(2, date.getSeconds()) + '.' +
         Math.floor(date.getMilliseconds() / 100)
}

function humanResultLine (combat, directive) {
  let timeStr = humanTime(directive.time)
  switch (directive.action) {
    case 'attack':
      let action = directive.source === combat.hero ? 'attack' : 'defend'
      let damage = directive.damage || 'miss'
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

module.exports = class Combat extends EventEmitter {
  constructor (hero) {
    super()

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
    let changed = false
    while (targetTime > this.nextTime()) {
      changed = true
      let directive = this.combat.result[this._next++]
      this.console.push(humanResultLine(this.combat, directive))
      this.state.process(directive)
    }

    if (changed) {
      this.emit('change')
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
      if (this.combat) {
        this.hero.backpack.push(...this.combat.drops)
        localStorage.hero = JSON.stringify(this.hero)
      }
      this.console.push(`${humanTime()} - Walking to next area...`)
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
    if (!this.combat) {
      return
    }

    let directive = this.combat.result[this._next]
    return directive && directive.time
  }

  get combat () {
    return this._combat
  }
  set combat (combat) {
    this._next = 0
    this._combat = combat
    this.state = new CombatState([combat.hero, ...combat.enemies])
    if (this._autoSyncing) {
      this._scheduleAutoSync()
    }
  }
}
