let _ = require('lodash')

let Hero = require('lib/core/hero/base')
let Stats = require('lib/core/stats')

module.exports = class Enemy {
  constructor(level){
    this.stats = Enemy.statsForLevel(level)
    this.attackDelay = 1000
    this.initiative = 0
  }

  static statValueForLevel(level){
    return 2 * Hero.statValueForLevel(level)
  }

  static statsForLevel(level){
    return Stats.allAt(Enemy.statValueForLevel(level))
  }

  toString(){
    return 'enemy'
  }

  rollDamage(){
    return _.random(100, 200)
  }
}
