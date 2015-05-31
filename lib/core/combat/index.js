let createSchedule = require('./scheduler')
let Duel = require('./duel')
let Hps = require('./hps')
let Enemy = require('tc/core/enemy')
let generator = require('tc/util/generator')

const MAX_DURATION_MS = 100

module.exports = class Combat {
  constructor(hero, enemies){
    this.hero = hero
    this.enemies = enemies || [new Enemy(1)]

    let chars = [this.hero, ...this.enemies]
    this.schedule = createSchedule(chars)

    this.result = []

    this._hps = new Hps(chars)

    this._duels = {}
  }

  static run(hero){
    return new Combat(hero).run()
  }

  run(){
    for(let row of this.runner()){
      this.result.push(row)
    }
    return this
  }

  *runner(){
    for(let [time, attackers] of generator.timeout(MAX_DURATION_MS, this.schedule)){
      if(this.isDone()){
        break
      }

      for(let attacker of attackers){
        if(this._hps.isActive(attacker)){
          yield* this.processAttack(time, attacker)
        }
      }
    }

    yield* this.processCleanup()
  }

  processCleanup(){
    return []
  }

  kill(char){
    this._hps.kill(char)
  }

  isDone(){
    return this.nextEnemy() == null
  }

  defenderOf(attacker){
    return (attacker === this.hero) ? this.nextEnemy() : this.hero
  }

  nextEnemy(){
    return this.enemies.find((enemy) => this._hps.isActive(enemy))
  }

  duelFor(attacker, defender){
    let key = `${attacker}-${defender}`
    if(!this._duels[key]){
      this._duels[key] = new Duel(attacker.stats, defender.stats)
    }

    return this._duels[key]
  }

  *processAttack(time, attacker){
    let defender = this.defenderOf(attacker)
    let duel = this.duelFor(attacker, defender)
    let damage = duel.calculate(Math.random(), attacker.rollDamage())

    let hp = this._hps.hurt(defender, damage)
    yield [time, 'attack', attacker, defender, damage]

    if(hp < 0 && defender === this.hero){
      // TODO: real recovery
      yield this._hps.recover(defender)
    }
  }
}
