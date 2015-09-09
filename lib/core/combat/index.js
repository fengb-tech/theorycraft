let createSchedule = require('./scheduler')
let Duel = require('./duel')
let Hps = require('./hps')
let Enemy = require('lib/core/enemy')
let generator = require('lib/util/generator')
let time = require('lib/util/time')

const DEFAULT_TIMEOUT = 1000

module.exports = class Combat {
  constructor(hero, options = {}){
    this.startTime = options.startTime || time.now()

    this.hero = hero
    this.enemies = options.enemies || [new Enemy(1)]

    let chars = [this.hero, ...this.enemies]
    this.schedule = options.schedule || createSchedule(this.startTime, chars)
    this.runTimeout = options.runTimeout || DEFAULT_TIMEOUT

    this.result = []

    this._hps = new Hps(chars)

    this._duels = {}
  }

  static run(hero){
    return new Combat(hero).run()
  }

  get endTime(){
    return this.result[this.result.length - 1].time
  }

  run(){
    for(let row of this.runner()){
      this.result.push(row)
    }
    return this
  }

  *runner(){
    for(var [time, attackers] of generator.timeout(this.runTimeout, this.schedule)){
      for(let attacker of attackers){
        if(this._hps.isActive(attacker)){
          yield* this.processAttack(time, attacker)
        }
      }

      if(this.isDone()){
        break
      }
    }

    yield* this.processCleanup(time)
  }

  processCleanup(heroLastAttackTime){
    let nextActionTime = heroLastAttackTime + this.hero.attackDelay
    let mendDuration = 1000

    return [
      { time: nextActionTime, action: 'recover', target: this.hero },
      { time: nextActionTime + mendDuration, action: 'end' },
    ]
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

  processAttack(time, attacker){
    let directives = []

    let defender = this.defenderOf(attacker)
    let duel = this.duelFor(attacker, defender)
    let hitRoll = Math.random()
    let damage = duel.calculate(hitRoll, attacker.rollDamage())

    let directive = {
      time,
      action: 'attack',
      target: defender,
      source: attacker,
      damage,
      isCrit: duel.isCrit(hitRoll),
    }
    this._hps.process(directive)
    directives.push(directive)

    let hp = this._hps.lookup(this.hero)
    if(hp < 0 && defender === this.hero){
      // TODO: real recovery
      directive = { time, action: 'recover', target: defender }
      this._hps.process(defender)
      directives.push(directive)
    }

    return directives
  }
}
