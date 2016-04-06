const _ = require('lodash')

const createSchedule = require('./scheduler')
const Duel = require('./duel')
const State = require('./state')

const Monster = require('lib/core/monster')
const Item = require('lib/core/item')

const generator = require('lib/util/generator')
const time = require('lib/util/time')

const DEFAULT_TIMEOUT = 1000

module.exports = class Combat {
  constructor (hero, options = {}) {
    this.startTime = options.startTime || time.now()

    this.hero = hero
    this.enemies = options.enemies || [Monster.generate(hero.base.level)]

    let chars = [this.hero, ...this.enemies]
    this.schedule = options.schedule || createSchedule(this.startTime, chars)
    this.runTimeout = options.runTimeout || DEFAULT_TIMEOUT

    // TODO: rename
    this.result = []

    this.state = new State(chars)

    this._duels = {}
  }

  static run (hero) {
    return new Combat(hero).run()
  }

  get endTime () {
    return this.result[this.result.length - 1].time
  }

  run () {
    if (this.isDone()) {
      return this
    }

    for (let row of this.runner()) {
      // TODO: rename
      this.result.push(row)
    }

    // TODO: rename
    if (this.state.isAlive(this.hero)) {
      this.blorks = {
        drops: [Item.generate(1)],
        xpChange: _.sum(this.enemies, (e) => e.xp),
        hp: this.state.hps[this.hero],
      }
    } else {
      this.blorks = {
        drops: [],
        xpChange: 0,
        hp: this.state.hps[this.hero],
      }
    }

    return this
  }

  * runner () {
    for (var [timeMs, attackers] of generator.timeoutIters(this.runTimeout, this.schedule)) {
      for (let attacker of attackers) {
        if (this.state.isAlive(attacker)) {
          yield* this.processAttack(timeMs, attacker)
        }
      }

      if (this.isDone()) {
        break
      }
    }

    yield* this.processCleanup(timeMs)
  }

  processCleanup (heroLastAttackTime) {
    return [
      { time: heroLastAttackTime + this.hero.attackDelay, action: 'end' },
    ]
  }

  kill (char) {
    this.state.kill(char)
  }

  isDone () {
    return !this.state.isAlive(this.hero) || this.nextEnemy() == null
  }

  defenderOf (attacker) {
    return (attacker === this.hero) ? this.nextEnemy() : this.hero
  }

  nextEnemy () {
    return this.enemies.find((enemy) => this.state.isAlive(enemy))
  }

  duelFor (attacker, defender) {
    let key = `${attacker}-${defender}`
    if (!this._duels[key]) {
      this._duels[key] = new Duel(attacker, defender)
    }

    return this._duels[key]
  }

  processAttack (time, attacker) {
    let directives = []

    let defender = this.defenderOf(attacker)
    let duel = this.duelFor(attacker, defender)
    let hitRoll = Math.random()
    let damage = duel.calculate(hitRoll)

    let directive = {
      time,
      action: 'attack',
      target: defender,
      source: attacker,
      damage,
    }
    this.state.process(directive)
    directives.push(directive)

    let hp = this.state.hps[defender]
    if (hp <= 0 && defender === this.hero) {
      // TODO: potions!
      // directive = { time, action: 'recover', target: defender }
    }

    return directives
  }
}
