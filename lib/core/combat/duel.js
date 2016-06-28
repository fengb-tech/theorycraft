module.exports = class Duel {
  constructor (attacker, defender) {
    this.attacker = attacker
    this.defender = defender
  }

  calculate (hitRoll) {
    let targetHit = 1 - this.hitPercent()
    if (hitRoll < targetHit) {
      return null
    }

    let damageRange = this.maxDamage() - this.minDamage()
    let damageRoll = (hitRoll - targetHit) / this.hitPercent()

    let damage = this.minDamage() + (damageRange * damageRoll)

    return Math.round(damage)
  }

  hitPercent () {
    return Math.min(1, this.attacker.stats.accuracy / this.defender.stats.dodge)
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
