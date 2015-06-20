let Stats = require('lib/core/stats')

module.exports = class Base {
  constructor(xp){
    this.xp = xp
  }

  static statValueForLevel(level){
    return 100 * Math.pow(1.05, level - 1)
  }

  static statsForLevel(level){
    return Stats.allAt(Base.statValueForLevel(level))
  }

  static levelForXp(xp){
    return 1
  }

  get xp(){
    return this._xp
  }

  set xp(xp){
    this._xp = xp

    let targetLevel = Base.levelForXp(xp)
    if(this.level !== targetLevel){
      this.level = targetLevel
      this.stats = Base.statsForLevel(targetLevel)
    }
  }
}
