import createSchedule from './scheduler'
import Duel from './duel'

export default function combat(hero, enemies){
  return new Combat(hero, enemies).run()
}

export class Combat {
  constructor(hero, enemies){
    this.hero = hero
    this.enemies = enemies
  }

  run*(){
    let directives = {}
    for(let [time, attackers] of createSchedule([hero, ...enemies])){
      let activeAttackers = attackers.filter((attacker) => attacker.hp > 0)
      if(activeAttackers.length <= 0){
        continue
      }

      directives[time] = activeAttackers.map((attacker) => {
        let defender = (attacker === this.hero) ? this.nextEnemy() : this.hero
        return this.duel(attacker, defender)
      })

      if(isDone()){
        break
      }
    }

    return directives
  }

  isDone(){
    this.hero.hp <= 0 || this.nextEnemy() != null
  }

  nextEnemy(){
    return this.enemies.find((enemy) => enemy.hp > 0)
  }

  duel(attacker, defender){
    let duel = new Duel(attacker.stats, defender.stats)
    let roll = Math.random()
    if(roll < duel.hitPercent){
      return
    }

    let damage = attacker.rollDamage() * duel.damageMultiplier
    if(roll >= duel.critPercent){
      damage *= duel.critMultiplier
    }

    defender.hp -= damage
    if(defender.hp <= 0){
      this.cleanup(defender)
    }
  }
}
