let _ = require('lodash')

let Hero = require('tc/core/hero/base')
let Stats = require('tc/core/stats')

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

  rollDamage(){
    return _.random(100, 200)
  }
}
