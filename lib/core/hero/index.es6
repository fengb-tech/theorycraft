import Equipment from './equipment'
import Base from './base'

export default class Hero {
  constructor(){
    this.base = new Base(0)
    this.equipment = new Equipment()
    this.hp = 10000
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
