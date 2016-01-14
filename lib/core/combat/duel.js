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
    return this.attacker.minDamage
  }

  maxDamage () {
    return this.attacker.maxDamage
  }
}
