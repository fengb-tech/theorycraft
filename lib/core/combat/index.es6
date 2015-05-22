import createSchedule from './scheduler'
import Duel from './duel'

export default function combat(hero, enemies){
  return Array.from(new Combat(hero, enemies).run())
}

export class Combat {
  constructor(hero, enemies){
    this.hero = hero
    this.enemies = enemies
    this.schedule = createSchedule([this.hero, ...this.enemies])
  }

  *run(){
    for(let [time, attackers] of this.schedule){
      if(this.isDone()){
        break
      }

      let activeAttackers = attackers.filter((attacker) => attacker.hp > 0)
      if(activeAttackers.length <= 0){
        continue
      }

      let attacks = activeAttackers.map((attacker) => this.duelFor(attacker))

      yield [time, attacks]
    }

    let cleanup = this.cleanup()
    if(cleanup != null){
      yield cleanup
    }
  }

  cleanup(){
  }

  isDone(){
    return this.hero.hp <= 0 || this.nextEnemy() == null
  }

  defenderOf(attacker){
    return (attacker === this.hero) ? this.nextEnemy() : this.hero
  }

  nextEnemy(){
    return this.enemies.find((enemy) => enemy.hp > 0)
  }

  duelFor(attacker){
    let defender = this.defenderOf(attacker)
    let duel = new Duel(attacker.stats, defender.stats)
    let damage = duel.run(Math.random(), attacker.rollDamage())
    defender.hp -= damage
    return { attacker, defender, damage }
  }
}
