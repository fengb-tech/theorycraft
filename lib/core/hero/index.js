const _ = require('lodash')
const EventEmitter = require('eventemitter3')

const Equipment = require('./equipment')
const calcBase = require('./base')

const eventable = require('lib/util/eventable')

module.exports = class Hero extends EventEmitter {
  constructor () {
    super()
    this.base = calcBase()
    this.equipment = new Equipment()
    this.backpack = eventable.array()

    // TODO: make this smarter
    this.equipment.on('change', () => {
      this.emit('change')
    })

    // TODO: better UUID
    this.uuid = `hero-${_.random(1000000000000)}`
  }

  toJSON () {
    return _.pick(this, ['base', 'equipment', 'backpack'])
  }

  toString () {
    return this.uuid
  }

  get stats () {
    return this.base.stats.add(this.equipment.stats)
  }

  addXp (xp) {
    this.base = calcBase(xp)
    this.emit('change')
  }

  get initiative () {
    return 0
  }

  get attackDelay () {
    return this.equipment.attackDelay
  }

  get minDamage () {
    return this.equipment.minDamage
  }

  get maxDamage () {
    return this.equipment.maxDamage
  }
}
