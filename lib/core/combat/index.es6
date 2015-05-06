import _ from 'lodash'
import Scheduler from './scheduler'
import Duel from './duel'

export default class Combat {
  constructor(startTime, hero, enemies){
    this.lastTickTime = startTime
    this.hero = hero
    this.enemies = enemies
    this.attackers = [hero, ...enemies]
    this.done = false

    this.scheduler = new Scheduler(startTime, this.attackers)
    this.resolve(this.scheduler.initiative())
  }

  tickTo(targetTime){
    if(this.done || targetTime <= this.lastTickTime){
      return
    }

    let schedule = this.scheduler.between(this.lastTickTime, targetTime)
    this.lastTickTime = targetTime
    this.resolve(schedule)
  }

  resolve(schedule){
    let times = Object.keys(schedule).sort((a, b) => a - b)
    for(let time of times){
      for(let a of schedule[time]){
        let attacker = this.attackers[a]
        let defender = (attacker === this.hero) ? this.nextEnemy() : this.hero
        this.duel(attacker, defender)

        if(this.done){
          return
        }
      }
    }
  }

  nextEnemy(){
    return _.find(this.enemies, (enemy) => enemy.hp > 0)
  }

  duel(attacker, defender){
    let duel = new Duel(attacker.stats, defender.stats)
    let roll = Math.random()
    if(roll < duel.hitPercent){
      return
    }

    let damage = attacker.baseDamage() * duel.damageMultiplier
    if(roll >= duel.critPercent){
      damage *= duel.critMultiplier
    }

    defender.hp -= damage
    if(defender.hp <= 0){
      this.cleanup(defender)
    }
  }

  cleanup(defender){
    if(this.done){
      return
    }

    if(defender === this.hero){
      this.done = true
    } else if(_.every(this.enemies, (enemy) => enemy.hp <= 0)){
      this.done = true
    }
  }
}
