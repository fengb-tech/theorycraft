const _ = require('lodash')

const Stats = require('lib/core/stats')

module.exports = class Monster {
  constructor () {
    this.initiative = 0
    this.attackDelay = 1000
    this.minDamage = 1
    this.maxDamage = 10
    this.uuid = `monster-${_.random(1000000000000)}`
    this.stats = Stats.allAt(100)
  }

  toString () {
    return this.uuid
  }
}
