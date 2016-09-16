const _ = require('lodash')
const data = require('lib/data/weapons')
const Stats = require('lib/core/stats')

const Weapon = module.exports = class Weapon {
  constructor (data) {
    _.merge(this, data)
    this.type = 'weapon'
    this.stats = this.stats || new Stats()
    this.uuid = `weapon-${_.random(100000000000)}`
  }

  static dpms (data) {
    let damage = (data.minDamage + data.maxDamage) / 2
    return damage / data.attackDelay
  }

  static generate (ilvl) {
    let template = _.sample(data.templates)
    return Weapon.fromTemplate(template, ilvl)
  }

  static fromTemplate (template, ilvl) {
    let delayWeight = 1 + _.random(data.randomize.attackDelay, true)
    let maxDamageAdjustWeight = _.random(data.randomize.maxDamage, true)
    let maxDamageAdjust = template.maxDamage * maxDamageAdjustWeight

    return new Weapon({
      template: template,
      name: _.sample(template.names),
      attackDelay: Math.round(template.attackDelay * delayWeight),
      minDamage: Math.round((template.minDamage - maxDamageAdjust) * delayWeight),
      maxDamage: Math.round((template.maxDamage + maxDamageAdjust) * delayWeight),
      stats: Stats.allAt(ilvl)
    })
  }

  get dpms () {
    return Weapon.dpms(this)
  }
}

Weapon.EMPTY = new Weapon(data.empty)

Weapon.data = data
