import Stats from 'tc/core/stats'

export default class Level {
  constructor(value){
    this.value = value
    this.stats = new Stats()
  }

  static targetForXp(xp){
    return 1
  }

  valueOf(){
    return this.value
  }
}
