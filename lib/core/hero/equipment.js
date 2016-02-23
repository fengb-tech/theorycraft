const _ = require('lodash')
const EventEmitter = require('eventemitter3')

const Stats = require('lib/core/stats')
const Item = require('lib/core/item')
const Weapon = require('lib/core/item/weapon')

module.exports = class Equipment extends EventEmitter {
  constructor (opts = {}) {
    super()
    _.merge(this, Item.EMPTY, opts)
    this.weapon = new Weapon(this.weapon)
  }

  toJSON () {
    return _.pick(this, Item.TYPES)
  }

  get items () {
    return _.map(Item.TYPES, (type) => this[type])
  }

  get stats () {
    let itemStatses = _.map(Item.TYPES, (type) => this[type].stats)
    return Stats.mergeAll(itemStatses)
  }

  get attackDelay () {
    return this.weapon.attackDelay
  }

  get minDamage () {
    return this.weapon.minDamage
  }

  get maxDamage () {
    return this.weapon.maxDamage
  }
}
