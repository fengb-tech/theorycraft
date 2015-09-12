const _ = require('lodash')
const Equipment = require('./equipment')
const Base = require('./base')

module.exports = class Hero {
  constructor () {
    this.base = new Base(0)
    this.equipment = new Equipment()

    // TODO: better UUID
    this.uuid = `hero-${_.random(1000000000000)}`
  }

  toString () {
    return this.uuid
  }

  get stats () {
    return this.base.stats.add(this.equipment.stats)
  }

  addXp (xp) {
    this.base.xp += xp
  }

  get initiative () {
    return 0
  }

  get attackDelay () {
    return this.equipment.attackDelay
  }

  rollDamage () {
    return this.equipment.rollDamage()
  }
}
