let createSchedule = require('./scheduler')
let Duel = require('./duel')
let Hps = require('./hps')
let Enemy = require('tc/core/enemy')
let generator = require('tc/util/generator')

const MAX_DURATION_MS = 100

module.exports = class Combat {
  constructor(hero, enemies){
    this.hero = hero
    this.enemies = enemies

    let chars = [hero, ...enemies]
    this.schedule = createSchedule(chars)

    this._hps = new Hps(chars)
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
    for(let [time, attackers] of generator.timeout(MAX_DURATION_MS, this.schedule)){
      if(this.isDone()){
        break
      }

      for(let attacker of attackers){
        if(this._hps.isActive(attacker)){
          yield this.processAttack(time, attacker)
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

  processAttack(time, attacker){
    let defender = this.defenderOf(attacker)
    let duel = new Duel(attacker.stats, defender.stats)
    let damage = duel.calculate(Math.random(), attacker.rollDamage())

    this.processDamage(defender, damage)
    return [time, 'attack', attacker, defender, damage]
  }

  processDamage(defender, damage){
    let hp = this._map.hurt(defender, damage)
    if(hp < 0 && defender === this.hero){
      // TODO: real recovery
      this._hps.recover(defender)
    }
  }
}
