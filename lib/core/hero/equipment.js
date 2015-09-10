const _ = require('lodash')

const Stats = require('lib/core/stats')
const Item = require('lib/core/item')

module.exports = class Equipment {
  constructor(){
    _.merge(this, Item.EMPTY)
  }

  get stats(){
    let itemStatses = _.map(Item.TYPES, (type) => this[type].stats)
    return Stats.mergeAll(itemStatses)
  }

  get attackDelay(){
    return this.weapon.attackDelay
  }

  rollDamage(){
    return _.random(this.weapon.minDamage, this.weapon.maxDamage)
  }
}
