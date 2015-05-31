let Equipment = require('./equipment')
let Base = require('./base')

module.exports = class Hero {
  constructor(){
    this.base = new Base(0)
    this.equipment = new Equipment()
  }

  toString(){
    return 'hero'
  }

  get stats(){
    return this.base.stats.add(this.equipment.stats)
  }

  addXp(xp){
    this.base.xp += xp
  }

  get initiative(){
    return 0
  }

  get attackDelay(){
    return this.equipment.attackDelay
  }

  rollDamage(){
    return this.equipment.rollDamage()
  }
}
