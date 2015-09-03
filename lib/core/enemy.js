let _ = require('lodash')

let Hero = require('lib/core/hero/base')
let Stats = require('lib/core/stats')
let Item = require('lib/core/item')

module.exports = class Enemy {
  constructor(level){
    this.baseStats = Hero.statsForLevel(level)
    this.initiative = 0

    this.weapon = Item.generateWeapon(level)
    this.items = [this.weapon]
  }

  get stats(){
    let statses = _.map(this.items, (item) => item.stats)
    statses.push(this.baseStats)
    return Stats.mergeAll(statses)
  }

  get attackDelay(){
    return this.weapon.attackDelay
  }

  rollDamage(){
    return _.random(this.weapon.minDamage, this.weapon.maxDamage)
  }
}
