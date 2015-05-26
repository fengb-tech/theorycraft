import createSchedule from './scheduler'
import Duel from './duel'

const ITERATION_OVERFLOW = 1000

export default function combat(hero, enemies){
  return new Combat(hero, enemies).run()
}

export class Combat {
  constructor(hero, enemies){
    this.hero = hero
    this.enemies = enemies
    this.schedule = createSchedule([this.hero, ...this.enemies])
  }

  run(){
    if(!this._run){
      this._run = Array.from(this.runner())
    }
    return this._run
  }

  *runner(){
    let iterations = 0
    for(let [time, attackers] of this.schedule){
      if(++iterations > ITERATION_OVERFLOW){
        throw new RangeError(`Too many iterations: ${iterations}`)
      }

      if(this.isDone()){
        break
      }

      for(let attacker of attackers){
        if(attacker.hp <= 0){
          continue
        }

        yield [time, this.processAttack(attacker)]
      }
    }

    for(let directive of this.processCleanup()){
      yield directive
    }
  }

  processCleanup(){
    return []
  }

  isDone(){
    return this.nextEnemy() == null
  }

  defenderOf(attacker){
    return (attacker === this.hero) ? this.nextEnemy() : this.hero
  }

  nextEnemy(){
    return this.enemies.find((enemy) => enemy.hp > 0)
  }

  processAttack(attacker){
    let defender = this.defenderOf(attacker)
    let duel = new Duel(attacker.stats, defender.stats)
    let damage = duel.run(Math.random(), attacker.rollDamage())
    defender.hp -= damage
    return { attacker, defender, damage }
  }
}
