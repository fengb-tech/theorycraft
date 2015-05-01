import Stats from 'tc/core/stats'

export default class Level {
  constructor(value){
    this.value = value
    this.stats = Stats.allAt(100 * Math.pow(1.05, value - 1))
  }

  static targetForXp(xp){
    return 1
  }

  valueOf(){
    return this.value
  }
}
