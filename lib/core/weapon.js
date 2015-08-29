const _ = require('lodash')

const Weapon = module.exports = class Weapon {
  constructor(template){
    this.template = template
    this.name = _.sample(template.names)
    this.minDamage = _.random(1000, true)
    this.maxDamage = _.random(1000, true)
    this.delay = _.random(1000, true)
  }

  static dpms(data){
    let damage = (data.minDamage + data.maxDamage) / 2
    return damage / data.delay
  }
}

Weapon.data = require('lib/data/weapons')
