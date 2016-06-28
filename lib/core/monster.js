const _ = require('lodash')

const data = require('lib/data/monsters')

const Stats = require('lib/core/stats')

module.exports = class Monster {
  constructor (data) {
    _.merge(this, data)
    this.uuid = `monster-${_.random(1000000000000)}`
  }

  static generate (mlvl) {
    let template = _.sample(data.templates)
    return Monster.fromTemplate(template, mlvl)
  }

  static fromTemplate (template, mlvl) {
    let delayWeight = 1 + _.random(data.randomize.attackDelay, true)
    return new Monster({
      initiative: 0,
      xp: template.xp * mlvl,
      attackDelay: template.attackDelay * delayWeight,
      minDamage: template.minDamage * delayWeight,
      maxDamage: template.maxDamage * delayWeight,
      stats: Stats.allAt(100),
    })
  }

  toString () {
    return this.uuid
  }
}
