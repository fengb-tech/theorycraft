let createSchedule = require('./scheduler')
let Duel = require('./duel')
let Enemy = require('tc/core/enemy')

const MS_OVERFLOW = 100
const FULL_HP = 10000

module.exports = class Combat {
  constructor(hero, enemies){
    this.hero = hero
    this.enemies = enemies

    let chars = [hero, ...enemies]
    this.schedule = createSchedule(chars)

    this._hps = new Map()
    for(let char of chars){
      this._hps.set(char, FULL_HP)
    }
  }

  static run(hero){
    let enemy = new Enemy(1)
    return new Combat(hero, [enemy]).run()
  }

  run(){
    if(!this._run){
      Combat._current = this
      this._run = Array.from(this.runner())
      Combat._current = null
    }
    return this._run
  }

  *runner(){
    let startMs = new Date().valueOf()

    for(let [time, attackers] of this.schedule){
      let duration = new Date() - startMs
      if(duration >= MS_OVERFLOW){
        throw new RangeError(`Timeout: ${duration}ms`)
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

    this.processDamage(defender, damage)
    return { attacker, defender, damage }
  }

  processDamage(defender, damage){
    let hp = this._hps.get(defender) - damage
    if(hp > 0){
      this._hps.set(defender, hp)
    } else if(defender === this.hero){
      // TODO: real recovery
      this._hps.set(defender, FULL_HP)
    } else {
      this.kill(defender)
    }
  }
}
