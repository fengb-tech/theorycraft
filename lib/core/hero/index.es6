let Equipment = require('./equipment')
let Base = require('./base')

module.exports = class Hero {
  constructor(){
    this.base = new Base(0)
    this.equipment = new Equipment()
  }

  get stats(){
    return this.base.stats.add(this.equipment.stats)
  }

  addXp(xp){
    this.base.xp += xp
  }

  rollDamage(){
    return this.equipment.rollDamage()
  }
}
