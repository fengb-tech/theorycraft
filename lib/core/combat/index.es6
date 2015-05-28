let createSchedule = require('./scheduler')
let Duel = require('./duel')
let Enemy = require('tc/core/enemy')

const ITERATION_OVERFLOW = 1000

module.exports = class Combat {
  constructor(hero, enemies){
    this.hero = hero
    this.enemies = enemies

    let chars = [hero, ...enemies]
    this.schedule = createSchedule(chars)

    this._hps = new Map()
    for(let char of chars){
      this._hps.set(char, 10000)
    }
  }

  static run(hero){
    let enemy = new Enemy(1)
    return new Combat(hero, [enemy]).run()
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
        if(this._hps.get(attacker) > 0){
          yield [time, this.processAttack(attacker)]
        }
      }
    }

    for(let directive of this.processCleanup()){
      yield directive
    }
  }

  processCleanup(){
    return []
  }

  kill(char){
    this._hps.set(char, 0)
  }

  isDone(){
    return this.nextEnemy() == null
  }

  defenderOf(attacker){
    return (attacker === this.hero) ? this.nextEnemy() : this.hero
  }

  nextEnemy(){
    return this.enemies.find((enemy) => this._hps.get(enemy) > 0)
  }

  processAttack(attacker){
    let defender = this.defenderOf(attacker)
    let duel = new Duel(attacker.stats, defender.stats)
    let damage = duel.calculate(Math.random(), attacker.rollDamage())
    defender.hp -= damage
    return { attacker, defender, damage }
  }
}
