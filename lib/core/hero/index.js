const _ = require('lodash')
const EventEmitter = require('eventemitter3')

const Equipment = require('./equipment')
const Base = require('./base')

const eventable = require('lib/util/eventable')

module.exports = class Hero extends EventEmitter {
  constructor () {
    super()
    this.base = new Base(0)
    this.equipment = new Equipment()
    this.backpack = eventable.array()

    // TODO: make this smarter
    this.equipment.on('change', () => {
      this.emit('change')
    })

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

  get minDamage () {
    return this.equipment.minDamage
  }

  get maxDamage () {
    return this.equipment.maxDamage
  }
}
