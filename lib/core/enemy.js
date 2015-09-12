const _ = require('lodash')

const Hero = require('lib/core/hero/base')
const Stats = require('lib/core/stats')
const Item = require('lib/core/item')

module.exports = class Enemy {
  constructor (level) {
    this.baseStats = Hero.statsForLevel(level)
    this.initiative = 0

    this.weapon = Item.generateWeapon(level)
    this.items = [this.weapon]

    // TODO: better UUID
    this.uuid = `enemy-${_.random(1000000000000)}`
  }

  get stats () {
    let statses = _.map(this.items, (item) => item.stats)
    statses.push(this.baseStats)
    return Stats.mergeAll(statses)
  }

  get attackDelay () {
    return this.weapon.attackDelay
  }

  rollDamage () {
    return _.random(this.weapon.minDamage, this.weapon.maxDamage)
  }

  toString () {
    return this.uuid
  }
}
