export default class Duel {
  constructor(attackerStats, defenderStats){
    this.attackerStats = attackerStats
    this.defenderStats = defenderStats
  }

  get hitPercent(){
    return Math.min(0.7 * this.attackerStats.accuracy / this.defenderStats.dodge, 1)
  }

  get critPercent(){
    return 1
  }

  get damageMultiplier(){
    return this.attackerStats.power / this.defenderStats.armor
  }

  get critMultiplier(){
    return 1 + this.attackerStats.critical / this.defenderStats.resilience
  }
}
