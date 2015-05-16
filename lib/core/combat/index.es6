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

  *run(){
    for(let [time, attackers] of createSchedule([this.hero, ...this.enemies])){
      let activeAttackers = attackers.filter((attacker) => attacker.hp > 0)
      if(activeAttackers.length <= 0){
        continue
      }

      let attacks = activeAttackers.map((attacker) => {
        let defender = (attacker === this.hero) ? this.nextEnemy() : this.hero
        return this.duel(attacker, defender)
      })

      yield [time, attacks]

      if(this.isDone()){
        return
      }
    }
  }

  isDone(){
    return this.hero.hp <= 0 || this.nextEnemy() != null
  }

  nextEnemy(){
    return this.enemies.find((enemy) => enemy.hp > 0)
  }

  duel(attacker, defender){
    let duel = new Duel(attacker.stats, defender.stats)
    let damage = duel.run(Math.random(), attacker.rollDamage())
    defender.hp -= damage
    return { attacker, defender, damage }
  }
}
