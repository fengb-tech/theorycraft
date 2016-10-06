module.exports = class Duel {
  constructor (attacker, defender) {
    this.attacker = attacker
    this.defender = defender
  }

  simulate (time, roll = Math.random()) {
    let mult = this.baseMultiplier()
    if (roll >= this.targetPercent()) {
      mult++
    }

    return {
      time: time,
      type: 'attack',
      source: this.attacker,
      target: this.defender,
      damage: mult ? mult * this.calculateBaseDamage() : null,
      multiplier: mult
    }
  }

  calculateBaseDamage (damageRoll = Math.random()) {
    let damageRange = this.maxDamage() - this.minDamage()
    let damage = this.minDamage() + (damageRange * damageRoll)
    return Math.round(damage)
  }

  hitPercent () {
    return this.attacker.stats.accuracy / this.defender.stats.dodge
  }

  targetPercent () {
    return 1 - (this.hitPercent() % 1)
  }

  baseMultiplier () {
    return Math.floor(this.hitPercent())
  }

  minDamage () {
    let min = this.targetMinDamage()
    let max = this.targetMaxDamage()
    return min <= max ? min : (min + max) * 0.5
  }

  maxDamage () {
    let min = this.targetMinDamage()
    let max = this.targetMaxDamage()
    return Math.max(min, max)
  }

  targetMinDamage () {
    let multiplier = this.attacker.stats.finesse / this.defender.stats.armor
    return this.attacker.minDamage * multiplier
  }

  targetMaxDamage () {
    let multiplier = this.attacker.stats.power / this.defender.stats.armor
    return this.attacker.maxDamage * multiplier
  }
}
