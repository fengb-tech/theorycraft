const pubsub = require('./pubsub')
const CombatCore = require('lib/core/combat')
const CombatSimulation = require('lib/core/combat/simulation')
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
      let action = this.combat.result[this._next++]
      this.combat.simulation.process(action)
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
        this.hero.addXp(this.combat.blorks.xp)
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

    let action = this.combat.result[this._next]
    return action && action.time
  }

  get combat () {
    return this._combat
  }
  set combat (combat) {
    this._next = 0
    this._combat = combat
    combat.simulation = new CombatSimulation([combat.hero, ...combat.enemies])
    if (this._autoSyncing) {
      this._scheduleAutoSync()
    }
    pubsub.emit('combat', combat)
  }
}
