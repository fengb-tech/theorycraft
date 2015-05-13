import Stats from 'tc/core/stats'

export function statValueForLevel(level){
  return 100 * Math.pow(1.05, level - 1)
}

export function statsForLevel(level){
  return Stats.allAt(statValueForLevel(level))
}

export function levelForXp(xp){
  return 1
}

export default class Base {
  constructor(xp){
    this.xp = xp
  }

  get xp(){
    return this._xp
  }

  set xp(xp){
    this._xp = xp

    let targetLevel = levelForXp(xp)
    if(this.level !== targetLevel){
      this.level = targetLevel
      this.stats = statsForLevel(targetLevel)
    }
  }
}
