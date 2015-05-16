import { statValueForLevel as heroStatValueForLevel } from 'tc/core/hero/base'
import { randomInt } from 'tc/util/random'
import Stats from 'tc/core/stats'

export function statValueForLevel(level){
  return 2 * heroStatValueForLevel(level)
}

export function statsForLevel(level){
  return Stats.allAt(statValueForLevel(level))
}

export default class Enemy {
  constructor(level){
    this.stats = statsForLevel(level)
  }

  rollDamage(){
    return randomInt(100, 200)
  }
}
