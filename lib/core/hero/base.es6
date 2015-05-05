import Stats from 'tc/core/stats'

export default class Base {
  constructor(xp){
    this.xp = xp
  }

  static levelForXp(xp){
    return 1
  }

  static statsForLevel(level){
    return Stats.allAt(100 * Math.pow(1.05, level - 1))
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

  valueOf(){
    return this.value
  }
}
