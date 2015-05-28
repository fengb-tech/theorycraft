let Hero = require('tc/core/hero/base')
let random = require('tc/util/random')
let Stats = require('tc/core/stats')

module.exports = class Enemy {
  constructor(level){
    this.stats = Enemy.statsForLevel(level)
    this.attackMspa = 1000
    this.initiative = 0
  }

  static statValueForLevel(level){
    return 2 * Hero.statValueForLevel(level)
  }

  static statsForLevel(level){
    return Stats.allAt(Enemy.statValueForLevel(level))
  }

  rollDamage(){
    return random.int(100, 200)
  }
}
