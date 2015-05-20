export default class Duel {
  constructor(attackerStats, defenderStats){
    this.attackerStats = attackerStats
    this.defenderStats = defenderStats
  }

  calculate(hitRoll, baseDamage){
    if(hitRoll > this.hitPercent()){
      return null
    }

    let damage = baseDamage * this.damageMultiplier()

    if(hitRoll < this.critPercent()){
      damage *= this.critMultiplier()
    }

    return damage
  }

  hitPercent(){
    return Math.min(1, this.attackerStats.accuracy / this.defenderStats.dodge)
  }

  critPercent(){
    let hitOverflow = this.attackerStats.accuracy - this.defenderStats.dodge
    if(hitOverflow > 0){
      return Math.min(1, 0.1 + hitOverflow / this.defenderStats.dodge)
    } else {
      return 0.1 * this.attackerStats.accuracy / this.defenderStats.dodge
    }
  }

  damageMultiplier(){
    return this.attackerStats.power / this.defenderStats.armor
  }

  critMultiplier(){
    return 1 + this.attackerStats.critical / this.defenderStats.resilience
  }
}
