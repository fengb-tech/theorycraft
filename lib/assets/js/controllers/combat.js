const pubsub = require('./pubsub')
const CombatCore = require('lib/core/combat')
const CombatState = require('lib/core/combat/state')
const run = require('lib/util/run')
const time = require('lib/util/time')

const TRAVEL_TIME = 5000

module.exports = class Combat {
  constructor (hero) {
    this.hero = hero
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
      let directive = this.combat.result[this._next++]
      this.state.process(directive)
      pubsub.emit('combat', this.combat, directive, this.state)
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
        this.hero.addXp(this.combat.blorks.xpChange)
        this.hero.backpack.push(...this.combat.blorks.drops)
        localStorage.hero = JSON.stringify(this.hero)
      }
      // TODO: add back 'walking' event
      // this.console.push(`${humanTime()} - Walking to next area...`)
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
