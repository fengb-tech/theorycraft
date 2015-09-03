const _ = require('lodash')
const data = require('lib/data/weapons')
const Stats = require('lib/core/stats')

const Weapon = module.exports = class Weapon {
  constructor(data){
    _.merge(this, data)
    this.type = 'weapon'
    this.stats = this.stats || new Stats()
  }

  static dpms(data){
    let damage = (data.minDamage + data.maxDamage) / 2
    return damage / data.attackDelay
  }

  static generate(){
    let template = _.sample(data.templates)
    return Weapon.fromTemplate(template)
  }

  static fromTemplate(template){
    let delayWeight = 1 + _.random(...data.randomize.attackDelay)
    let maxDamageAdjustWeight = _.random(...data.randomize.maxDamage)
    let maxDamageAdjust = template.maxDamage * maxDamageAdjustWeight

    return new Weapon({
      template: template,
      name: _.sample(template.names),
      attackDelay: Math.round(template.attackDelay * delayWeight),
      minDamage: Math.round((template.minDamage - maxDamageAdjust) * delayWeight),
      maxDamage: Math.round((template.maxDamage + maxDamageAdjust) * delayWeight)
    })
  }

  get dpms(){
    return Weapon.dpms(this)
  }
}

Weapon.EMPTY = new Weapon(data.empty)

Weapon.data = data
