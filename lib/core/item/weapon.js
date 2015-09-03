const _ = require('lodash')
const data = require('lib/data/weapons')
const Stats = require('lib/core/stats')

const Weapon = module.exports = class Weapon {
  constructor(template){
    this.stats = this.stats || new Stats()

    this.template = template
    this.name = _.sample(template.names)

    let delayWeight = 1 + _.random(...data.randomize.attackDelay)
    let maxDamageAdjustWeight = _.random(...data.randomize.maxDamage)
    let maxDamageAdjust = template.maxDamage * maxDamageAdjustWeight

    this.attackDelay = Math.round(template.attackDelay * delayWeight)
    this.minDamage = Math.round((template.minDamage - maxDamageAdjust) * delayWeight)
    this.maxDamage = Math.round((template.maxDamage + maxDamageAdjust) * delayWeight)
  }

  static dpms(data){
    let damage = (data.minDamage + data.maxDamage) / 2
    return damage / data.attackDelay
  }

  get dpms(){
    return Weapon.dpms(this)
  }
}

Weapon.DEFAULT = new Weapon(data.default)

Weapon.data = data
