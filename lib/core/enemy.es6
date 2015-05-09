import { Base as HeroBase } from 'tc/core/hero/base'
import { randomInt } from 'tc/util/random'
import Stats from 'tc/core/stats'

export default class Enemy {
  constructor(level){
    this.stats = Enemy.statsForLevel(level)
  }

  static statValueForLevel(level){
    return 2 * HeroBase.statValueForLevel(level)
  }

  static statsForLevel(level){
    return Stats.allAt(Enemy.statValueForLevel(level))
  }

  rollDamage(){
    return randomInt(100, 200)
  }
}
